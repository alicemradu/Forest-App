// Sky.js
import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

const Sky = ({ scene, setSkyGui }) => {
  const skyRef = useRef(null);
  const guiRef = useRef(null);

// Sky.js
useEffect(() => {
  if (!scene || skyRef.current || guiRef.current) return;

  const loader = new GLTFLoader();
  loader.load(
    `${process.env.PUBLIC_URL}/sky.glb`,
    (gltf) => {
      const skyModel = gltf.scene;
      scene.add(skyModel);
      skyRef.current = skyModel;

      if (!guiRef.current) {
        guiRef.current = new dat.GUI();
      } else {
        guiRef.current.destroy(); // Distruge instanța veche de dat.gui
        guiRef.current = new dat.GUI(); // Creează una nouă
      }

      const gui = guiRef.current;
      const skyFolder = gui.addFolder('Sky Properties');
      skyFolder.add(skyModel.position, 'x', -50, 50).name('Position X');
      skyFolder.add(skyModel.position, 'y', -50, 50).name('Position Y');
      skyFolder.add(skyModel.position, 'z', -50, 50).name('Position Z');
      skyFolder.open();
    },
    undefined,
    (error) => {
      console.error('Error loading glTF model:', error);
    }
  );

  return () => {
    if (skyRef.current) {
      scene.remove(skyRef.current);
    }
    if (guiRef.current) {
      guiRef.current.destroy();
      guiRef.current = null;
    }
  };
}, [scene]);

  return null;
};

export default Sky;
