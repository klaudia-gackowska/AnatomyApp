var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var markerRoot1;
var imageMesh; // Zmienna do przechowywania płaskiego obrazu
var imageMaterial;

initialize();
animate();

function initialize() {
    scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);

    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResize();
        arToolkitSource.copySizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
        }
    }

    arToolkitSource.init(function onReady() {
        onResize();
    });

    window.addEventListener('resize', function () {
        onResize();
    });

    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    markerRoot1 = new THREE.Group();
    scene.add(markerRoot1);

    let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
        type: 'pattern',
        patternUrl: "data/kg.patt",
    });

    imageMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    var geometry = new THREE.PlaneGeometry(3.5, 2.5);
    imageMesh = new THREE.Mesh(geometry, imageMaterial);
    imageMesh.position.y = 0.5;
    imageMesh.rotation.x = -Math.PI / 2;
    markerRoot1.add(imageMesh);

    changeImage('/dist/models/anatomia.png');

    setupMenuButtons();
    setupMenuToggle();
}

function update() {
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}



function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime;
    update();
    render();
}

function changeImage(imageName) {
    var texture = new THREE.TextureLoader().load(imageName);
    imageMaterial.map = texture;
    imageMaterial.needsUpdate = true;
}

function setupMenuButtons() {
    document.getElementById('btnAnatomia').addEventListener('click', function() { changeImage('/dist/models/anatomia.png'); });
    document.getElementById('btnSerce').addEventListener('click', function() { changeImage('/dist/models/serce.png'); });
    document.getElementById('btnPluca').addEventListener('click', function() { changeImage('/dist/models/pluca.png'); });
    document.getElementById('btnWatroba').addEventListener('click', function() { changeImage('/dist/models/watroba.png'); });
    document.getElementById('btnSzkielet').addEventListener('click', function() { changeImage('/dist/models/szkieletBezTla.png'); });
    document.getElementById('btnJelita').addEventListener('click', function() { changeImage('/dist/models/Jelita.png'); });
}

function setupMenuToggle() {
    document.getElementById('menuButton').addEventListener('click', function() {
        var menuItems = document.getElementById('menuItems');
        if (menuItems.style.display === 'none') {
            menuItems.style.display = 'block';
        } else {
            menuItems.style.display = 'none';
        }
    });
}