// import * as THREE from "three";

import ShapeGenerator from "./ShapeGenerator.js";
import ScenePhysics from "./GameLogic/Physics/ScenePhysics.js";

import Player from "./GameLogic/Entities/Player.js";

import ProceduralMapGenerator from "./GameLogic/Functionalities/ProceduralMapGenerator.js";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { Shape } from "three";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls(camera, renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

let currentRenderer = renderer;

const clock = new THREE.Clock();

let playAnimation = true;

let mainCamera = false;

scene.scenePhysics = new ScenePhysics(scene, {energyLoss: 0.8});

let player = new Player(scene, [1,1,1], "sprite", 10, 10, 100);
player.object.position.y = 10;
player.setCamera(75, 90, window.innerWidth / window.innerHeight, 0.1, 1000);
player.setWeaponObject([1, player.object.geometry.parameters.height*0.5, -2]);
player.object.createPhysics(scene, {});

if(player.input.giroscopeControls.enabled){
    const stereoEffect = new StereoEffect(renderer);
    stereoEffect.eyeSeparation = 0.06;

    currentRenderer = stereoEffect;
}

// const stereoEffect = new StereoEffect(renderer);
// stereoEffect.eyeSeparation = 0.06;

// currentRenderer = stereoEffect;

let mapSize = {width: 50, depth: 50, height: 10};
let wallSize = {width: 5, depth:5, height: mapSize.height};
let map = new ProceduralMapGenerator(scene, mapSize, wallSize);
map.setWalls(20);
map.create();

scene.scenePhysics.setBounds(Math.hypot(mapSize.width, mapSize.depth, mapSize.height));

camera.position.z = 3;
camera.position.x = 2;
camera.position.y = 1;

let target;

player.object.add(camera);

let light = createLight(0xFFFFFF, 1, {x: 0, y: 50, z: 0});
scene.add(light);

scene.scenePhysics.add(...map.getItems(), player.object);

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
    switch(event.code){
        case "KeyR":
            playAnimation = !playAnimation;
        break;

        case "KeyC":
            mainCamera = !mainCamera;
        break;
    }
});

function animate() {
	requestAnimationFrame(animate);

    if(mainCamera){
        target = player.object.position.clone();

        target.z += -4;
        // target.x += camera.position.x;
        // target.y += camera.position.y;
        
        controls.target = target;

        currentRenderer.render(scene, camera);
        controls.update();
    }else{
        currentRenderer.render(scene, player.camera);
    }
    
    if(playAnimation){
        player.update(clock.getDelta()*2);
        scene.scenePhysics.checkWorldCollisions();
        scene.scenePhysics.update(clock.getDelta()*0.5);

        if(player.object.position.y < -20){
            player.object.position.y = 10;
            player.object.physics.config.velocityVector.y = 0;
        }
    }
    // giroscopeControls.update();
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