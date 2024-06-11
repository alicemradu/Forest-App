import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Dog = ({ scene, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const dogRef = useRef(null);
  const mixerRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/dog.glb`, // Adjust the path if necessary
      (gltf) => {
        const dogModel = gltf.scene;
        dogModel.position.set(...position);
        dogModel.scale.set(...scale);
        scene.add(dogModel);
        dogRef.current = dogModel;

        const mixer = new THREE.AnimationMixer(dogModel);

        // Log available animations
        console.log(gltf.animations);

        // Play all animations
        const actions = gltf.animations.map((clip) => mixer.clipAction(clip));
        actions.forEach((action) => action.play());

        // Add blending and looping for playful behavior
        const playAction = (action) => {
          action.setLoop(THREE.LoopRepeat);
          action.play();
        };

        actions.forEach(playAction);

        mixerRef.current = mixer;

        const clock = new THREE.Clock();

        const animate = () => {
          requestRef.current = requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );

    return () => {
      if (dogRef.current) {
        scene.remove(dogRef.current);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [scene, position, scale]);

  return null;
};

export default Dog;
