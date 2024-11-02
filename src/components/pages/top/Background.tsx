
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../../../utils/shaders';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene,
        camera: THREE.OrthographicCamera,
        renderer: THREE.WebGLRenderer,
        geometry: THREE.PlaneGeometry,
        material: THREE.ShaderMaterial,
        mesh: THREE.Mesh;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

      if (canvasRef.current) {
        renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        updateRendererSize();

        const textureLoader = new THREE.TextureLoader();
        const backgroundTexture = textureLoader.load('/assets/bg.png');
        backgroundTexture.minFilter = THREE.LinearFilter;
        backgroundTexture.magFilter = THREE.LinearFilter;

        geometry = new THREE.PlaneGeometry(2, 8);
        material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            scroll: { value: 0 },
            backgroundTexture: { value: backgroundTexture },
            imageAspect: { value: 1080 / 4320 },
            screenAspect: { value: (window.innerWidth) / window.innerHeight },
            scrollFactor: { value: calculateScrollFactor() }
          },
          vertexShader,
          fragmentShader
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 1;
      } else {
        console.error('Canvas element not found');
        return;
      }
    };

    const calculateScrollFactor = () => {
      const scaledImageHeight = (window.innerWidth) / (1080 / 4320);
      return Math.min(1, window.innerHeight / scaledImageHeight);
    };

    const onScroll = () => {
      const scrollPosition = window.scrollY / (8640 - window.innerHeight);
      material.uniforms.scroll.value = scrollPosition;
    };

    const updateRendererSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onWindowResize = () => {
      updateRendererSize();
      material.uniforms.screenAspect.value = (window.innerWidth) / window.innerHeight;
      material.uniforms.scrollFactor.value = calculateScrollFactor();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    init();
    animate();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onWindowResize);
      // Clean up Three.js resources
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, height: '100%', zIndex: -1 }} />
    </>
  );
};

export default Background;