import React, { useEffect } from 'react';
import * as THREE from 'three';

const FirTree = ({ scene, position }) => {
  useEffect(() => {
    if (!scene) return;

    // Trunchiul bradului
    const trunkHeight = 6; // Înălțimea trunchiului ajustată
    const trunkGeometry = new THREE.CylinderGeometry(1, 1, trunkHeight, 32);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(position[0], position[1] + trunkHeight / 2, position[2]); // Poziție ajustată pe axa Y

    // Coroana bradului
    const crownHeight = 30; // Înălțimea coroanei ajustată
    const crownGeometry = new THREE.ConeGeometry(8, crownHeight, 32); // Geometrie conică pentru coroană
    const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.set(position[0], position[1] + trunkHeight + crownHeight / 2, position[2]); // Poziție ajustată pe axa Y

    scene.add(trunk);
    scene.add(crown);

    return () => {
      scene.remove(trunk);
      scene.remove(crown);
    };
  }, [scene, position]);

  return null;
};

export default FirTree;
