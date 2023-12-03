import * as THREE from 'three';

const arScene = new ARObject({
  trackingMethod: 'best', // Metoda śledzenia
  sourceType: 'webcam',   // Typ źródła (kamera)
});

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebXRRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffc0cb } );
const cube = new THREE.Mesh( geometry, material );
arScene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.008;
	cube.rotation.y += 0.008;

	renderer.render( arScene, camera );
}

animate();
