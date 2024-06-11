import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';  // Import THREE

const Plane = ({ scene }) => {
  const planeRef = useRef(null);
  const guiRef = useRef(null); // Ref pentru instanța dat.gui
  const requestRef = useRef(null); // Ref pentru requestAnimationFrame
  const radius = 50; // Raza cercului
  let angle = 0; // Unghiul inițial

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/plane.glb`,
      (gltf) => {
        const planeModel = gltf.scene;
        planeModel.position.set(radius, 41, 0);
        planeModel.scale.set(15, 15, 15);
        scene.add(planeModel);
        planeRef.current = planeModel;

        // Start animation loop
        const animate = () => {
          angle += 0.01; // Crește unghiul pentru a anima avionul
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          planeModel.position.set(x, 41, z);

          // Orient the plane to face the direction of travel
          const target = new THREE.Vector3(
            radius * Math.cos(angle + 0.01),
            41,
            radius * Math.sin(angle + 0.01)
          );
          planeModel.lookAt(target);

          requestRef.current = requestAnimationFrame(animate);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );

    return () => {
      if (planeRef.current) {
        scene.remove(planeRef.current);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [scene]);

  return null;
};

export default Plane;