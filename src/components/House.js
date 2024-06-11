import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

const House = ({ scene }) => {
  const houseRef = useRef(null);
  const guiRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/house.glb`,
      (gltf) => {
        const houseModel = gltf.scene;

        // Elimina vechiul model din scenă, dacă există
        if (houseRef.current) {
          scene.remove(houseRef.current);
        }

        // Setează noul model
        houseModel.position.set(0, 0, 0);
        houseModel.scale.set(0.1, 0.1, 0.1);
        scene.add(houseModel);
        houseRef.current = houseModel;

        // Elimina vechile controale dat.gui, dacă există
        if (guiRef.current) {
          guiRef.current.destroy();
        }

        // Creează o nouă instanță dat.gui și adaugă controale pentru noul model
        guiRef.current = new dat.GUI();
        const gui = guiRef.current;

        const houseFolder = gui.addFolder('House Properties');
        houseFolder.add(houseModel.position, 'x', -50, 50).name('Position X');
        houseFolder.add(houseModel.position, 'y', -50, 50).name('Position Y');
        houseFolder.add(houseModel.position, 'z', -50, 50).name('Position Z');
        houseFolder.add(houseModel.scale, 'x', 0.01, 1).name('Scale X');
        houseFolder.add(houseModel.scale, 'y', 0.01, 1).name('Scale Y');
        houseFolder.add(houseModel.scale, 'z', 0.01, 1).name('Scale Z');
        /////
        // Adăugare control pentru culoare
        const colorControl = { color: '#ffffff' };
        houseFolder.addColor(colorControl, 'color').onChange((value) => {
          houseModel.traverse((child) => {
            if (child.isMesh) {
              child.material.color.set(value);
            }
          });
        }).name('Color');
        /////
        houseFolder.open();
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );

    return () => {
      // Elimina modelul din scenă și controalele dat.gui când componenta este demontată
      if (houseRef.current) {
        scene.remove(houseRef.current);
        houseRef.current = null;
      }
      if (guiRef.current) {
        guiRef.current.destroy();
        guiRef.current = null;
      }
    };
  }, [scene]);

  return null;
};

export default House;
