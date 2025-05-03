"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

const ModelViewer = ({ clickerState }) => {
  const containerRef = useRef(null);
  
  // Refs for Three.js objects
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera());
  const renderer = useRef();
  const modelContainer = useRef(new THREE.Group());
  
  // Light refs
  const pointLight1 = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Three.js
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Initialize renderer with physically correct lighting
    renderer.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.current.setSize(width, height);
    renderer.current.shadowMap.enabled = true;
    renderer.current.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.current.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.current.domElement);

    // Camera setup
    camera.current = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.current.position.set(0, -0.66, 5);

    // Animated point lights
    pointLight1.current = new THREE.PointLight(0xffffff, 1, 30);
    pointLight1.current.position.set(30, 1, 3);
    scene.current.add(pointLight1.current);

    // Disco lights
    const createSpotlight = (color, intensity, position) => {
      const light = new THREE.SpotLight(color, intensity);
      light.position.set(...position);
      light.angle = Math.PI / 6;
      light.penumbra = 0.2;
      light.distance = 30;
      scene.current.add(light);
      return light;
    };

    const spotlights = [
      createSpotlight(0xffffff, 200, [0, 5, -5]),
      createSpotlight(0xffffff, 200, [-10, -10, 5])
    ];

    // Fill lights
    const fillLights = [
      new THREE.PointLight(0xffffff, 100, 20),
      new THREE.PointLight(0xffffff, 100, 20),
      new THREE.PointLight(0xffffff, 30, 20),
      new THREE.PointLight(0xffffff, 100, 20),
    ];

    fillLights[0].position.set(0, 0, 10);
    fillLights[1].position.set(-10, 0, 0);
    fillLights[2].position.set(10, 0, 0);
    fillLights[3].position.set(0, 10, 0);
    fillLights.forEach(light => scene.current.add(light));

    // Environment map (basic replacement)
    scene.current.background = new THREE.Color(0x160c2a);

    // Model loading
    const loader = new GLTFLoader();
    loader.load(
      '/models/lamp/scene.gltf',
      (gltf) => {
        const model = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        model.scale.set(scale, scale, scale);

        // Material enhancements
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material;
            material.metalness = 0.7;
            material.roughness = 0.3;
            material.envMapIntensity = 0.5;
          }
        });

        modelContainer.current.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        // Fallback geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.5
        });
        const fallbackModel = new THREE.Mesh(geometry, material);
        modelContainer.current.add(fallbackModel);
      }
    );

    // Scene setup
    scene.current.add(modelContainer.current);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera.current || !renderer.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Model rotation
      modelContainer.current.rotation.y = time * 0.24;

      renderer.current?.render(scene.current, camera.current);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.current?.domElement) {
        containerRef.current.removeChild(renderer.current.domElement);
      }
      scene.current.clear();
      modelContainer.current.clear();
    };
  }, []);

  useEffect(() => {
    if (clickerState === true) {
      gsap.to(camera.current.position, {
        y: -0.9,
        duration: 0.7,
        ease: "power2.inOut",
      });
      gsap.to(camera.current, {
        fov: 50,
        duration: 0.65,
        ease: "power2.inOut",
        // onUpdate: () => camera.current?.updateProjectionMatrix()
      });
    }
  }, [clickerState]);

  return (
    <div className="relative w-full h-screen overscroll-none flex justify-center items-center bg-gray-900">
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-default absolute bg-transparent z-20"
      />
    </div>
  );
};

export default ModelViewer;
