import * as THREE from "three";

import ShapeGenerator from "./ShapeGenerator.js";
import ScenePhysics from "./GameLogic/Physics/ScenePhysics.js";

import Player from "./GameLogic/Entities/Player.js";

import ProceduralMapGenerator from "./GameLogic/Functionalities/ProceduralMapGenerator.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

let playAnimation = true;

let scenePhysics = new ScenePhysics(scene, {friction: true, energyLoss: 0.8});

let player = new Player(scene, [1,1,1], "sprite", 10, 10, 100);
player.object.position.y = 10;
player.setCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
player.object.createPhysics(scene, {})

let mapSize = {width: 200, depth: 200, height: 10};
let wallSize = {width: 5, depth:5, height: mapSize.height};
let map = new ProceduralMapGenerator(scene, mapSize, wallSize);
map.setWalls(50);
map.create();

camera.position.z = 10;
camera.position.y = 10;

let light = createLight(0xFFFFFF, 1, {x: 0, y: 50, z: 0});
scene.add(light);

scenePhysics.add(...map.getItems(), player.object);

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


window.addEventListener("keydown", function(event){
    if(event.code == "KeyR"){
        playAnimation = !playAnimation
    }
});

function animate() {
	requestAnimationFrame(animate);

    renderer.render(scene, player.camera);
    if(playAnimation){
        player.update(clock.getDelta());
        scenePhysics.checkWorldCollisions();
        scenePhysics.update(1/1000);
    }
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