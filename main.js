import * as THREE from "three";

import ShapeGenerator from "./ShapeGenerator.js";
import FirstPersonCamera from "./GameLogic/Functionalities/FirstPersonCamera.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );


const clock = new THREE.Clock();

let cube = new ShapeGenerator("Box", [1,1,1]);
scene.add(cube);

let playerCameraController = new FirstPersonCamera(camera);

camera.position.z = 20;

window.addEventListener("keydown", function(event){
    switch (event.code) {
        case "KeyW":
            camera.position.z -= 1;
        break;

        case "KeyS":
            camera.position.z += 1;
        break;

        case "KeyA":
            camera.position.x -= 1;
        break;

        case "KeyD":
            camera.position.x += 1;
        break;
    }
})

//offset the camera and add it to the pivot
//you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..
// let cameraDistance = 1;
// camera.position.z = cameraDistance;
// orbit.add( camera );

scene.background = new THREE.CubeTextureLoader()
	.setPath( 'assets/Background/' )
	.load( [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png'
	]);


function animate() {
	requestAnimationFrame(animate);

    renderer.render(scene, camera);
    playerCameraController.update(clock.getDelta());
}
animate();

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createLight(color, intensity, position = {x: 0, y: 0, z: 0}){
    let light = new THREE.PointLight(color, intensity);
    light.position.set(position.x, position.y, position.z);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024; // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    light.shadow.focus = 1; // default
    return light;
}