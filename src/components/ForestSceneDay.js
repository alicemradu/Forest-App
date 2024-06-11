import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Ground from './Ground';
import Sky from './Sky';
import Plane from './Plane';
import House from './House';
import Tree from './Tree';
import FirTree from './FirTree';
import Dog from './Dog';
import Table from './Table'; 

const ForestSceneDay = () => {
  const sceneRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    const currentSceneRef = sceneRef.current;

    if (!currentSceneRef) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentSceneRef.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x111111, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 10, 5);
    scene.add(pointLight);

    camera.position.set(0, 20, 20);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    //miscară scena
    const handleKeyDown = (event) => {
      const { key } = event;
      const speed = 0.05; // Viteza de rotație
    
      if (key === 'ArrowLeft') {
        scene.rotation.y += speed; // Rotirea spre stânga
      } else if (key === 'ArrowRight') {
        scene.rotation.y -= speed; // Rotirea spre dreapta
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      if (renderer.domElement && currentSceneRef) {
        currentSceneRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100vh' }}>
      {scene && (
        <>
          <Ground scene={scene} />
          <Sky scene={scene} />
          <Plane scene={scene} />
          <House scene={scene} />
          <Tree scene={scene} position={[20, 0, -25]} />
          <FirTree scene={scene} position={[25, 0, 30]} />
          <FirTree scene={scene} position={[-20, 0, -20]} />
          <Tree scene={scene} position={[30, 0, 10]} />
          <Dog scene={scene} position={[10, 0, 25]} scale={[2, 2, 2]} /> {/* Ajustează scala câinelui aici */}
          <Table scene={scene} position={[-15, 0, 30]} scale={[3, 3, 3]} /> {/* Adaugăm componenta Picnic */}
        </>
      )}
    </div>
  );
};

export default ForestSceneDay;