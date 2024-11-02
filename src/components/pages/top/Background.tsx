// Background.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../../../utils/shaders';

const BREAKPOINT = 760; // ブレイクポイントを定義

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWideScreen, setIsWideScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth > BREAKPOINT : true
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene,
        camera: THREE.OrthographicCamera,
        renderer: THREE.WebGLRenderer,
        geometry: THREE.PlaneGeometry,
        material: THREE.ShaderMaterial,
        mesh: THREE.Mesh,
        currentTexture: THREE.Texture | null = null;

    const loadTexture = (isWide: boolean) => {
      const textureLoader = new THREE.TextureLoader();
      const texturePath = isWide ? '/assets/bg_wide.png' : '/assets/bg.png';
      
      return new Promise<THREE.Texture>((resolve) => {
        textureLoader.load(texturePath, (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          resolve(texture);
        });
      });
    };

    const updateTexture = async (isWide: boolean) => {
      if (!material) return;

      const newTexture = await loadTexture(isWide);
      
      if (currentTexture) {
        currentTexture.dispose();
      }
      
      currentTexture = newTexture;
      material.uniforms.backgroundTexture.value = newTexture;
      
      const imageAspect = newTexture.image.width / newTexture.image.height;
      material.uniforms.imageAspect.value = imageAspect;
      material.uniforms.textureHeight.value = newTexture.image.height;
      
      onWindowResize();
    };

    const init = async () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

      if (canvasRef.current) {
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current, 
          antialias: true,
          alpha: true 
        });
        updateRendererSize();

        geometry = new THREE.PlaneGeometry(2, 2);
        material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            scroll: { value: 0 },
            backgroundTexture: { value: null },
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

        // 初期テクスチャの読み込み
        await updateTexture(isWideScreen);
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
      const newIsWideScreen = window.innerWidth > BREAKPOINT;
      
      // 画面幅が変更されてブレイクポイントを跨いだ場合のみテクスチャを更新
      if (newIsWideScreen !== isWideScreen) {
        setIsWideScreen(newIsWideScreen);
        updateTexture(newIsWideScreen);
      }

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
      if (currentTexture) {
        currentTexture.dispose();
      }
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isWideScreen]); // isWideScreenの変更を監視

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

export default Background;