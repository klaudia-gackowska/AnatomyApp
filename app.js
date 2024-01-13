/*
import * as THREE from 'three';

let scene;
let camera;
let renderer;

function main()
{
    const canvas = document.querySelector('#myCanvas');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
    camera.position.z = 2;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({canvas: canvas, antalias: true,});
    renderer.setSize(window.innerWidth/window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);

    const bearGeometry = new THREE.SphereGeometry(0.6, 32,32);
    const bearMatherial =  new THREE.MeshPhongMaterial({
        //roughness: 1,
        //metalness: 0,
        map: new THREE.TextureLoader().load('dist/models/mis.PNG'),
        bumpMap: new THREE.TextureLoader().load('dist/models/mis.PNG'),
        bumpScale: 0.3,
    });

    const bearMesh = new THREE.Mesh(bearGeometry, bearMatherial);

    scene.add(bearMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointerLight = new THREE.PointLight(0xffffff, 0.9);
    pointerLight.position.set(5,3,5);
    scene.add(pointerLight);


    const animate = () => {
        requestAnimationFrame(animate);
        bearMesh.rotation.y -= 0.0002;

        render();
    }

    const render = () => {
        renderer.render(scene, camera);
    }
    

    animate();
}

window.onload = main; 

*/