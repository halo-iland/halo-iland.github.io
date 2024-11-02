
// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { vertexShader, fragmentShader } from '../../../utils/shaders';

// const Background: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     let scene: THREE.Scene,
//         camera: THREE.OrthographicCamera,
//         renderer: THREE.WebGLRenderer,
//         geometry: THREE.PlaneGeometry,
//         material: THREE.ShaderMaterial,
//         mesh: THREE.Mesh;

//     const init = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

//       if (canvasRef.current) {
//         renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
//         updateRendererSize();

//         const textureLoader = new THREE.TextureLoader();
//         const backgroundTexture = textureLoader.load('/assets/bg.png');
//         backgroundTexture.minFilter = THREE.LinearFilter;
//         backgroundTexture.magFilter = THREE.LinearFilter;

//         geometry = new THREE.PlaneGeometry(2, 8);
//         material = new THREE.ShaderMaterial({
//           uniforms: {
//             time: { value: 0 },
//             scroll: { value: 0 },
//             backgroundTexture: { value: backgroundTexture },
//             imageAspect: { value: 1080 / 4320 },
//             screenAspect: { value: (window.innerWidth) / window.innerHeight },
//             scrollFactor: { value: calculateScrollFactor() }
//           },
//           vertexShader,
//           fragmentShader
//         });
//         mesh = new THREE.Mesh(geometry, material);
//         scene.add(mesh);

//         camera.position.z = 1;
//       } else {
//         console.error('Canvas element not found');
//         return;
//       }
//     };

//     const calculateScrollFactor = () => {
//       const windowAspect = (window.innerWidth) / window.innerHeight;
//       const scaledImageHeight = (window.innerWidth) / (1080 / 4320);
//       return Math.min(1, window.innerHeight / scaledImageHeight);
//     };

//     const onScroll = () => {
//       const scrollPosition = window.scrollY / (8640 - window.innerHeight);
//       material.uniforms.scroll.value = scrollPosition;
//     };

//     const updateRendererSize = () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     const onWindowResize = () => {
//       updateRendererSize();
//       material.uniforms.screenAspect.value = (window.innerWidth) / window.innerHeight;
//       material.uniforms.scrollFactor.value = calculateScrollFactor();
//     };

//     const animate = () => {
//       requestAnimationFrame(animate);
//       material.uniforms.time.value += 0.05;
//       renderer.render(scene, camera);
//     };

//     init();
//     animate();

//     window.addEventListener('scroll', onScroll);
//     window.addEventListener('resize', onWindowResize);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onWindowResize);
//       // Clean up Three.js resources
//       scene.remove(mesh);
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <>
//       <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, height: '100%', zIndex: -1 }} />
//     </>
//   );
// };

// export default Background;

// Background.tsx
// Background.tsx
// Background.tsx

















// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { vertexShader, fragmentShader } from '../../../utils/shaders';

// const Background: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     let scene: THREE.Scene,
//         camera: THREE.OrthographicCamera,
//         renderer: THREE.WebGLRenderer,
//         geometry: THREE.PlaneGeometry,
//         material: THREE.ShaderMaterial,
//         mesh: THREE.Mesh;

//     const init = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

//       if (canvasRef.current) {
//         renderer = new THREE.WebGLRenderer({ 
//           canvas: canvasRef.current, 
//           antialias: true,
//           alpha: true 
//         });
//         updateRendererSize();

//         const textureLoader = new THREE.TextureLoader();
//         const backgroundTexture = textureLoader.load('/assets/bg.png', (texture) => {
//           const imageAspect = texture.image.width / texture.image.height;
//           material.uniforms.imageAspect.value = imageAspect;
//           onWindowResize();
//         });
        
//         backgroundTexture.minFilter = THREE.LinearFilter;
//         backgroundTexture.magFilter = THREE.LinearFilter;

//         geometry = new THREE.PlaneGeometry(2, 2);
//         material = new THREE.ShaderMaterial({
//           uniforms: {
//             time: { value: 0 },
//             scroll: { value: 0 },
//             backgroundTexture: { value: backgroundTexture },
//             imageAspect: { value: 1 },
//             screenAspect: { value: window.innerWidth / window.innerHeight },
//             distortionStrength: { value: 0.02 },
//             distortionScale: { value: 3.0 }
//           },
//           vertexShader,
//           fragmentShader,
//           transparent: true
//         });
        
//         mesh = new THREE.Mesh(geometry, material);
//         scene.add(mesh);

//         camera.position.z = 1;
//       }
//     };

//     const onScroll = () => {
//       const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
//       // スクロール値を0から1の範囲で反転
//       const scrollPosition = 1.0 - (window.scrollY / totalScroll);
//       material.uniforms.scroll.value = scrollPosition;
//     };

//     const updateRendererSize = () => {
//       if (renderer && canvasRef.current) {
//         renderer.setSize(window.innerWidth, window.innerHeight, false);
//       }
//     };

//     const onWindowResize = () => {
//       updateRendererSize();
//       if (material) {
//         material.uniforms.screenAspect.value = window.innerWidth / window.innerHeight;
//       }
//     };

//     const animate = () => {
//       requestAnimationFrame(animate);
//       material.uniforms.time.value += 0.01;
//       renderer.render(scene, camera);
//     };

//     init();
//     animate();

//     window.addEventListener('scroll', onScroll);
//     window.addEventListener('resize', onWindowResize);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onWindowResize);
//       scene.remove(mesh);
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <canvas 
//       ref={canvasRef} 
//       style={{ 
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100vh',
//         zIndex: -1
//       }} 
//     />
//   );
// };

// export default Background;






// Background.tsx
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
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current, 
          antialias: true,
          alpha: true 
        });
        updateRendererSize();

        const textureLoader = new THREE.TextureLoader();
        const backgroundTexture = textureLoader.load('/assets/bg.png', (texture) => {
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

export default Background;