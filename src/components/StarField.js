import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import starTexture from '../components/star.png'; // Ensure the texture path is correct

const StarField = ({ scene }) => {
  const starFieldRef = useRef(null);

  useEffect(() => {
    const generateStars = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      // Generate positions and colors for the stars
      for (let i = 0; i < 5000; i++) { //5000 de stele
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        positions.push(x, y, z);

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, Math.random() * 0.5 + 0.5); // Add slight color variations

        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      // Load texture for the star sprite
      const starTextureLoader = new THREE.TextureLoader();
      const texture = starTextureLoader.load(starTexture);

      const material = new THREE.PointsMaterial({
        size: 10, // marime stele
        vertexColors: true, // culori diferite pentru fiecare particula
        map: texture, // seteaza textura pentru fiecare particula
        transparent: true, // face textura transparenta
      });

      const starField = new THREE.Points(geometry, material);
      scene.add(starField);

      // Animate the brightness of individual stars
      const animateStars = () => {
        const { array, itemSize } = geometry.attributes.color;
        const time = Date.now() * 0.001;

        for (let i = 0; i < array.length; i += itemSize) {
          const r = array[i];
          const g = array[i + 1];
          const b = array[i + 2];

          const color = new THREE.Color(r, g, b);
          const hsl = {};
          color.getHSL(hsl);

          hsl.l = Math.abs(Math.sin(time + i / itemSize * 0.1)); // Twinkling effect

          color.setHSL(hsl.h, hsl.s, hsl.l);

          array[i] = color.r;
          array[i + 1] = color.g;
          array[i + 2] = color.b;
        }

        geometry.attributes.color.needsUpdate = true; // Update colors
      };

      const animateId = setInterval(animateStars, 30);

      return { starField, animateId };
    };

    const { starField, animateId } = generateStars();

    return () => {
      scene.remove(starField);
      clearInterval(animateId);
    };
  }, [scene]);

  return null;
};

export default StarField;
