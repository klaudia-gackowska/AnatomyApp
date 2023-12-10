import "./style.css";
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

let myCanvas = document.getElementById('myCanvas')

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({canvas: myCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xd4d9db);
renderer.setPixelRatio(window.devicePixelRatio);

let light = new THREE.AmbientLight();
scene.add(light);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;

new OrbitControls(camera, renderer.domElement);

let loader = new GLTFLoader();

loader.load(
	"/dist/models/kolumna.glb",
	(glb) => {
		scene.add(glb.scene);
		animate();
	}
)

let animate = function (){
	requestAnimationFrame(animate);
	if (camera){
		renderer.render(scene, camera);
	}

}

