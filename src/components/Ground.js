import React, { useEffect } from 'react';
import * as THREE from 'three';
import boxTexture from './box.png'; // Importați textura cutiei

const Ground = ({ scene }) => {

  // Funcție pentru a genera culori aleatorii
  const generateRandomColor = () => {
    return Math.random() * 0xffffff;
  };

  // Functie pentru a crea o floare
  const createFlower = (x, z) => {
    const group = new THREE.Group();

    const flowerCenterGeometry = new THREE.SphereGeometry(0.3, 16, 16); //marime trunchi
    const flowerCenterMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const flowerCenter = new THREE.Mesh(flowerCenterGeometry, flowerCenterMaterial);
    group.add(flowerCenter);

    const petalGeometry = new THREE.SphereGeometry(0.2, 16, 16); //marime petale
    const petalMaterial = new THREE.MeshStandardMaterial({ color: generateRandomColor() });
    for (let i = 0; i < 8; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      const angle = (i / 8) * Math.PI * 2;
      petal.position.set(Math.cos(angle) * 0.45, 0.15, Math.sin(angle) * 0.45); // Ajustează poziția și dimensiunea petalelor
      group.add(petal);
    }

    group.position.set(x, 0, z); // Plaseaza grupul la nivelul terenului
    scene.add(group);
  };

  useEffect(() => {
    if (!scene) return;

    // Adaugare teren circular
    const radius = 50;
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22, wireframe: false });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Adaugare gard
    const fenceHeight = 5;
    const fenceGeometry = new THREE.CylinderGeometry(0.2, 0.2, fenceHeight, 32);
    const fenceMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const fenceRadius = radius - 5; // Reduc raza gardului pentru a-l poziționa mai aproape de centrul terenului
    const numSegments = 100;
    for (let i = 0; i < numSegments; i++) {
      const angle = (i / numSegments) * Math.PI * 2;
      const x = Math.cos(angle) * fenceRadius;
      const z = Math.sin(angle) * fenceRadius;
      const fence = new THREE.Mesh(fenceGeometry, fenceMaterial);
      fence.position.set(x, fenceHeight / 2, z);
      fence.rotation.y = -angle;
      scene.add(fence);
    }

    // Functie pentru a genera pozitii aleatorii pe teren
    const generateRandomPosition = () => {
      const posX = (Math.random() - 0.5) * radius * 2;
      const posZ = (Math.random() - 0.5) * radius * 2;
      return { x: posX, z: posZ };
    };

    // Functie pentru a verifica dacă o poziție este pe teren
    const isPositionOnGround = ({ x, z }) => {
      return Math.sqrt(x ** 2 + z ** 2) < radius;
    };

    // Adaugare flori pe teren
    const numFlowers = 20; // Numărul de flori
    for (let i = 0; i < numFlowers; i++) {
      let { x, z } = generateRandomPosition();

      // Ma asigur că florile sunt generate doar pe peticul de pământ
      while (!isPositionOnGround({ x, z })) {
        ({ x, z } = generateRandomPosition());
      }

      createFlower(x, z);
    }

    // Adăugare cutie de unelte la poziția specificată
    const boxSize = 5;
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const boxTextureLoader = new THREE.TextureLoader().load(boxTexture); // textura cutie
    const boxMaterial = new THREE.MeshStandardMaterial({ map: boxTextureLoader }); // material textura
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    const groundHeight = 0; // Înălțimea terenului la poziția specificată
    box.position.set(-25, boxSize / 2 + groundHeight, 30); // Plasez cutia pe pamant
    scene.add(box);


    // Cleanup
    return () => {
      scene.remove(ground);
    };
  }, [scene]);

  return null;
};

export default Ground;
