import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Table= ({ scene, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const picnicRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/picnic.glb`, // Ajustează calea către fișierul picnic.glb
      (gltf) => {
        const picnicModel = gltf.scene;
        picnicModel.position.set(...position);
        picnicModel.scale.set(...scale);
        scene.add(picnicModel);
        picnicRef.current = picnicModel;
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );

    return () => {
      if (picnicRef.current) {
        scene.remove(picnicRef.current);
      }
    };
  }, [scene, position, scale]);

  return null;
};

export default Table;
