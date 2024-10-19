let scene, camera, renderer, geometry, material, mesh;
let scrollPosition = 0;
const imageAspect = 1080 / 4320; // 画像のアスペクト比
const contentHeight = 8640; // コンテンツの高さ
const imageHeight = 4320; // 画像の高さ

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.left = '200px';
    renderer.domElement.style.width = 'calc(100% - 200px)';
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('img/bg.png');
    backgroundTexture.minFilter = THREE.LinearFilter;
    backgroundTexture.magFilter = THREE.LinearFilter;

    geometry = new THREE.PlaneGeometry(2, 8);
    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            scroll: { value: 0 },
            backgroundTexture: { value: backgroundTexture },
            imageAspect: { value: imageAspect },
            screenAspect: { value: window.innerWidth / window.innerHeight },
            scrollFactor: { value: calculateScrollFactor() }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 1;

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onWindowResize);

    animate();
}

function calculateScrollFactor() {
    const windowAspect = window.innerWidth / window.innerHeight;
    const scaledImageHeight = window.innerWidth / imageAspect;
    return Math.min(1, window.innerHeight / scaledImageHeight);
}

function onScroll() {
    scrollPosition = window.scrollY / (contentHeight - window.innerHeight);
    material.uniforms.scroll.value = scrollPosition;
    // console.log("Scroll Position:", scrollPosition); 
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.screenAspect.value = window.innerWidth / window.innerHeight;
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}



const targetElement = document.querySelector('.target-element');
const viewportHeight = window.innerHeight;
const elementHeight = targetElement.offsetHeight;

// 要素が画面の最下部にあるときのスクロール位置
const startScrollPosition = viewportHeight / 2 - elementHeight / 2 - 200;
// 要素が画面の半分の位置にあるときのスクロール位置
const endScrollPosition = viewportHeight - elementHeight / 2 - 200;

function updateClipPath() {
    const scrollPosition = window.scrollY;
    let progress = (scrollPosition - startScrollPosition) / (endScrollPosition - startScrollPosition);
    progress = Math.max(0, Math.min(1, progress));

    const startSize = 0;
    const endSize = 100;
    const currentSize = startSize + (endSize - startSize) * progress;

    targetElement.style.clipPath = `ellipse(${currentSize}% ${currentSize * 2}% at 50% 50%)`;
}

window.addEventListener('scroll', updateClipPath);
updateClipPath(); // 初期状態を設定



init();