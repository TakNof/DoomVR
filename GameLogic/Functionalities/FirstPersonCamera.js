import * as THREE from "three";
import InputController from "./InputController.js";

class FirstPersonCamera{
    constructor(camera){
        this.camera = camera;
        this.input = new InputController();
        this.rotation = new THREE.Quaternion();
        this.translation = new THREE.Vector3();
        this.phi = 0;
        this.theta = 0;
    }

    update(delta){
        this.input.update();
        this.updateRotation(delta);
        this.updateCamera(delta);
    }

    updateCamera(_){
        this.camera.quaternion.copy(this.rotation);
    }

    updateRotation(delta){
        const xh = this.input.current.mouseDelta.x / window.innerWidth;
        const yh = this.input.current.mouseDelta.y / window.innerHeight;

        this.phi += -xh * 5;
        this.theta = this.clamp(this.theta + -yh * 5, -Math.PI/3, Math.PI/3);

        const quaternions = new Array(3).fill(new THREE.Quaternion());

        quaternions[0].setFromAxisAngle(new THREE.Vector3(0,1,0), this.phi);
        quaternions[1].setFromAxisAngle(new THREE.Vector3(1,0,0), this.theta);

        quaternions[2].multiply(quaternions[0]);
        quaternions[2].multiply(quaternions[1]);

        this.rotation.copy(quaternions[2]);
    }

    clamp(val, min, max){
        return Math.min(Math.max(val, min), max);
    } 
}

export default FirstPersonCamera;
