var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var markerRoot1;
var imageMesh; // Zmienna do przechowywania płaskiego obrazu

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

    var geometry = new THREE.PlaneGeometry(1, 1); // Rozmiar płaszczyzny
    var texture = new THREE.TextureLoader().load('mis.png'); // Załaduj teksturę obrazu
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }); // Utwórz materiał z teksturą
    imageMesh = new THREE.Mesh(geometry, material); // Utwórz mesh z geometrią i materiałem
    imageMesh.position.y = 0.5; // Ustaw pozycję
    imageMesh.rotation.x = -Math.PI / 2; // Obróć, aby płaszczyzna była pozioma

    markerRoot1.add(imageMesh); // Dodaj mesh do markerRoot1
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



/*
var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var markerRoot1, markerRoot2;
//var mesh1;
var model; // Variable to hold your model
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

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
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResize()
        arToolkitSource.copySizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
        }
    }

    arToolkitSource.init(function onReady() {
        onResize()
    });

    window.addEventListener('resize', function () {
        onResize()
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
    })

    //let geometry1 = new THREE.CubeGeometry(1, 1, 1);
   // let material1 = new THREE.MeshNormalMaterial({
    //    transparent: true,
    //    opacity: 0.5,
    //    side: THREE.DoubleSide
   // });

    //mesh1 = new THREE.Mesh(geometry1, material1);
   // mesh1.position.y = 0.5;

   // markerRoot1.add(mesh1);
	
   var loader = new GLTFLoader();
   
   loader.load('models/dino/scene.gltf', function(gltf) {
	   model = gltf.scene;
	   model.position.y = 0.5; // Adjust position as needed
	   markerRoot1.add(model); // Add model to the markerRoot1
   }, undefined, function(error) {
	   console.error(error);
   });
   
//Instantiate a loader for the .gltf file
// const loader = new GLTFLoader();

// //Load the file
// loader.load(
//   `kolumna.glb`,
//   function (gltf) {
//     //If the file is loaded, add it to the scene
//     object = gltf.scene;
//     scene.add(object);
//   },
//   function (xhr) {
//     //While it is loading, log the progress
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//   },
//   function (error) {
//     //If there is an error, log it
//     console.error(error);
//   }
// );




}

function update() {
    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);
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

*/

/* 
import "./style.css";
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

var markerRoot1, markerRoot2;

var mesh1;

initialize();
animate();

function initialize()
{
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 640, 480 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	
	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls
	markerRoot1 = new THREE.Group();
	scene.add(markerRoot1);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type: 'pattern', patternUrl: "data/kg.patt",
	})

	let geometry1	= new THREE.CubeGeometry(1,1,1);
	let material1	= new THREE.MeshNormalMaterial({
		transparent: true,
		opacity: 0.5,
		side: THREE.DoubleSide
	}); 
	
	mesh1 = new THREE.Mesh( geometry1, material1 );
	mesh1.position.y = 0.5;
	
	markerRoot1.add( mesh1 );
}


function update()
{
	// update artoolkit on every frame
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
}


function render()
{
	renderer.render( scene, camera );
}


function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

*/