import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Fire = ({ scene, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const fireRef = useRef(null);
  const fireLightRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/fire.glb`, // Ajustează calea dacă este necesar
      (gltf) => {
        const fireModel = gltf.scene;
        fireModel.position.set(...position);
        fireModel.scale.set(...scale);
        scene.add(fireModel);
        fireRef.current = fireModel;

        // Adăugăm o lumină punctuală pentru efectul de foc
        const fireLight = new THREE.PointLight(0xff4500, 2, 50);
        fireLight.position.set(...position);
        scene.add(fireLight);
        fireLightRef.current = fireLight;

        // Funcție pentru a anima lumina focului
        const animateFireLight = () => {
          if (fireLightRef.current) {
            fireLightRef.current.intensity = 2 + Math.sin(Date.now() * 0.005) * 0.5;
          }
          requestAnimationFrame(animateFireLight);
        };

        animateFireLight();
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );

    return () => {
      if (fireRef.current) {
        scene.remove(fireRef.current);
      }
      if (fireLightRef.current) {
        scene.remove(fireLightRef.current);
      }
    };
  }, [scene, position, scale]);

  return null;
};

export default Fire;
