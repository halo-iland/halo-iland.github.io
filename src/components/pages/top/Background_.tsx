// Background.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../../../utils/shaders';

const Background1: React.FC = () => {
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
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current, 
          antialias: true,
          alpha: true 
        });
        updateRendererSize();

        const textureLoader = new THREE.TextureLoader();
        const backgroundTexture = textureLoader.load('/assets/bg_wide.png', (texture) => {
          const imageAspect = texture.image.width / texture.image.height;
          material.uniforms.imageAspect.value = imageAspect;
          material.uniforms.textureHeight.value = texture.image.height;
          onWindowResize();
        });
        
        backgroundTexture.minFilter = THREE.LinearFilter;
        backgroundTexture.magFilter = THREE.LinearFilter;

        geometry = new THREE.PlaneGeometry(2, 2);
        material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            scroll: { value: 0 },
            backgroundTexture: { value: backgroundTexture },
            imageAspect: { value: 1 },
            screenAspect: { value: window.innerWidth / window.innerHeight },
            distortionStrength: { value: 0.02 },
            distortionScale: { value: 3.0 },
            textureHeight: { value: 1 },
            viewportHeight: { value: window.innerHeight }
          },
          vertexShader,
          fragmentShader,
          transparent: true
        });
        
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 1;
      }
    };

    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY / totalScroll;
      material.uniforms.scroll.value = scrollPosition;
    };

    const updateRendererSize = () => {
      if (renderer && canvasRef.current) {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
      }
    };

    const onWindowResize = () => {
      updateRendererSize();
      if (material) {
        material.uniforms.screenAspect.value = window.innerWidth / window.innerHeight;
        material.uniforms.viewportHeight.value = window.innerHeight;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
    };

    init();
    animate();

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onWindowResize);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1
      }} 
    />
  );
};

export default Background1;