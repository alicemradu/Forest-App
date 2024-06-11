import React, { useEffect } from 'react';
import * as THREE from 'three';
import barkTexture from './bark.png'; // Asigură-te că este calea corectă către textura bark.png

const Tree = ({ scene, position }) => {
  useEffect(() => {
    if (!scene) return;

    const loader = new THREE.TextureLoader();

    // Încărcăm textura pentru trunchi
    const trunkTexture = loader.load(barkTexture);

    // Trunchiul copacului
    const trunkHeight = 6; // Înălțimea trunchiului ajustată
    const trunkGeometry = new THREE.CylinderGeometry(1, 1, trunkHeight, 32); // Dimensiuni mărite
    const trunkMaterial = new THREE.MeshStandardMaterial({
      map: trunkTexture,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(position[0], position[1] + trunkHeight / 2, position[2]); // Poziție ajustată pe axa Y

    // Coroana copacului
    const crownRadius = 12; // Rază coroană ajustată
    const crownGeometry = new THREE.SphereGeometry(crownRadius, 32, 32); // Dimensiuni mărite
    const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.set(position[0], position[1] + trunkHeight + crownRadius, position[2]); // Poziție ajustată pe axa Y

    scene.add(trunk);
    scene.add(crown);

    return () => {
      scene.remove(trunk);
      scene.remove(crown);
    };
  }, [scene, position]);

  return null;
};

export default Tree;
