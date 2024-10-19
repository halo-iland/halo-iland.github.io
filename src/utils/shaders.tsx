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
    uniform float screenAspect;
    uniform float navWidthRatio;

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
    float adjustedScreenAspect = screenAspect * (1.0 - navWidthRatio);
    float imageAspect = 0.25;

    float scaleX = adjustedScreenAspect / imageAspect;
    float scaleY = 1.0;
    float scale = min(scaleX, scaleY);

    vec2 scaledUV = (vUv - 0.5) / scale + 0.5;
    scaledUV.x = (scaledUV.x - navWidthRatio) / (1.0 - navWidthRatio);

    vec2 imageUV = clamp(scaledUV, 0.0, 1.0);

    // スクロール効果の調整
    float visiblePortion = 1.0 / scale;
    float scrollRange = 1.0 - visiblePortion;
    // imageUV.y = 1.0 - (imageUV.y * visiblePortion + scroll * scrollRange);
    imageUV.y = imageUV.y * visiblePortion + scroll * scrollRange;

    float t = time * 0.2 + scroll * 5.0;
    float noiseScale = 3.0;
    float noiseAmount = 0.015;
    vec2 distortion = vec2(
        noise(imageUV * noiseScale + vec2(t, 0.0)),
        noise(imageUV * noiseScale + vec2(0.0, t))
    ) * noiseAmount;

    vec2 distortedUV = imageUV + distortion;
    distortedUV = clamp(distortedUV, 0.0, 1.0);

    vec4 backgroundColor = texture2D(backgroundTexture, distortedUV);
    gl_FragColor = backgroundColor;
}

        // // アスペクト比の計算
        // float adjustedScreenAspect = screenAspect * (1.0 - navWidthRatio);

        // // 画像のアスペクト比（1:4）
        // float imageAspect = 0.25; // 1/4

        // // スケーリング係数の計算
        // float scaleX = adjustedScreenAspect / imageAspect;
        // float scaleY = 1.0;

        // // 画像全体が見えるようにスケールを調整
        // float scale = min(scaleX, scaleY);

        // // UV座標の調整
        // vec2 scaledUV = (vUv - 0.5) / scale + 0.5;

        // // ナビゲーションバーを考慮したx座標の調整
        // scaledUV.x = (scaledUV.x - navWidthRatio) / (1.0 - navWidthRatio);

        // // 画像の表示範囲を制限
        // vec2 imageUV = clamp(scaledUV, 0.0, 1.0);

        // // スクロール効果の適用
        // float visiblePortion = 1.0 / scale;
        // float scrollRange = 1.0 - visiblePortion;
        // imageUV.y = 1.0 - ((1.0 - imageUV.y) * visiblePortion + scroll * scrollRange);

        // // 歪み効果の適用
        // float t = time * 0.2 + scroll * 5.0;
        // float noiseScale = 3.0;
        // float noiseAmount = 0.015;
        // vec2 distortion = vec2(
        //     noise(imageUV * noiseScale + vec2(t, 0.0)),
        //     noise(imageUV * noiseScale + vec2(0.0, t))
        // ) * noiseAmount;

        // vec2 distortedUV = imageUV + distortion;
        // distortedUV = clamp(distortedUV, 0.0, 1.0);

        // // 最終的な色の計算
        // vec4 backgroundColor = texture2D(backgroundTexture, distortedUV);
        // gl_FragColor = backgroundColor;
    // }
`;
