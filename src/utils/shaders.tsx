// export const vertexShader = `
//     varying vec2 vUv;

//     void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// export const fragmentShader = `
//     uniform float time;
//     uniform float scroll;
//     uniform sampler2D backgroundTexture;
//     uniform float screenAspect;
//     uniform float navWidthRatio;

//     varying vec2 vUv;

//     vec2 hash(vec2 p) {
//         p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
//         return -1.0 + 2.0*fract(sin(p)*43758.5453123);
//     }

//     float noise(in vec2 p) {
//         const float K1 = 0.366025404;
//         const float K2 = 0.211324865;
        
//         vec2 i = floor(p + (p.x+p.y)*K1);
//         vec2 a = p - i + (i.x+i.y)*K2;
//         vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
//         vec2 b = a - o + K2;
//         vec2 c = a - 1.0 + 2.0*K2;
        
//         vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
        
//         vec3 n = h*h*h*h*vec3(dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
        
//         return dot(n, vec3(70.0));
//     }

//     void main() { 
//     float adjustedScreenAspect = screenAspect * (1.0 - navWidthRatio);
//     float imageAspect = 0.25;

//     float scaleX = adjustedScreenAspect / imageAspect;
//     float scaleY = 1.0;
//     float scale = min(scaleX, scaleY);

//     vec2 scaledUV = (vUv - 0.5) / scale + 0.5;
//     scaledUV.x = (scaledUV.x - navWidthRatio) / (1.0 - navWidthRatio);

//     vec2 imageUV = clamp(scaledUV, 0.0, 1.0);

//     // スクロール効果の調整
//     float visiblePortion = 1.0 / scale;
//     float scrollRange = 1.0 - visiblePortion;
//     // imageUV.y = 1.0 - (imageUV.y * visiblePortion +  * scrollRange);
//     imageUV.y = imageUV.y * visiblePortion + scroll * scrollRange;

//     float t = time * 0.2 + scroll * 5.0;
//     float noiseScale = 3.0;
//     float noiseAmount = 0.015;
//     vec2 distortion = vec2(
//         noise(imageUV * noiseScale + vec2(t, 0.0)),
//         noise(imageUV * noiseScale + vec2(0.0, t))
//     ) * noiseAmount;

//     vec2 distortedUV = imageUV + distortion;
//     distortedUV = clamp(distortedUV, 0.0, 1.0);

//     vec4 backgroundColor = texture2D(backgroundTexture, distortedUV);
//     gl_FragColor = backgroundColor;
// }
// `;
// shaders.tsx












// shaders.tsx
// shaders.tsx
export const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float time;
  uniform float scroll;
  uniform sampler2D backgroundTexture;
  uniform float imageAspect;
  uniform float screenAspect;
  uniform float distortionStrength;
  uniform float distortionScale;
  
  varying vec2 vUv;
  
  vec2 hash(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }
  
  float noise(in vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    
    vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h*vec3(dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    
    return dot(n, vec3(70.0));
  }
  
  void main() {
    float scale = screenAspect / imageAspect;
    vec2 uv = vUv;
    
    // 画像のアスペクト比に応じたスケーリング
    if (screenAspect > imageAspect) {
      // 画面が画像より横長の場合
      float newWidth = imageAspect / screenAspect;
      uv.x = (uv.x - 0.5) * newWidth + 0.5;
    } else {
      // 画面が画像より縦長の場合
      float newHeight = screenAspect / imageAspect;
      uv.y = (uv.y - 0.5) * newHeight + 0.5;
    }
    
    // スクロール効果の計算（下部が見えるように調整）
    float visibleHeight = min(1.0, screenAspect / imageAspect);
    float scrollRange = 1.0 - visibleHeight;
    float scrollOffset = scroll * scrollRange;
    uv.y = uv.y - scrollOffset;
    
    // 歪みエフェクトの計算
    float noiseTime = time * 0.2;
    vec2 distortion = vec2(
      noise(uv * distortionScale + vec2(noiseTime, 0.0)),
      noise(uv * distortionScale + vec2(0.0, noiseTime))
    );
    
    // スクロールに応じて歪みを強める
    distortion *= distortionStrength * (1.0 + (1.0 - scroll) * 2.0);
    
    // 歪みを適用
    vec2 finalUV = uv + distortion;
    
    // UV座標を0-1の範囲に制限
    finalUV = clamp(finalUV, 0.0, 1.0);
    
    vec4 color = texture2D(backgroundTexture, finalUV);
    gl_FragColor = color;
  }
`;
