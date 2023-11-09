import * as THREE from "three";
import InputController from "./InputController.js";

class FirstPersonCamera{
    constructor(camera, sensibility = 0){
        this.camera = camera;
        this.input = new InputController(sensibility);
        this.rotation = new THREE.Quaternion();
        this.translation = new THREE.Vector3();
        this.phi = 0;
        this.theta = 0;
    }

    update(delta){
        this.updateRotation(delta);
        this.updateCamera(delta);
        this.updateTranslation(delta);
        this.input.update();
    }

    updateCamera(_){
        this.camera.quaternion.copy(this.rotation);
        this.camera.position.copy(this.translation);
    }

    updateTranslation(delta){
        const forwardVelocity = (this.input.key(this.input.keyCodes.W) ? 1 : 0) + (this.input.key(this.input.keyCodes.S) ? -1 : 0);
        
        const strafeVelocity = (this.input.key(this.input.keyCodes.A) ? 1 : 0) + (this.input.key(this.input.keyCodes.D) ? -1 : 0);

        const qx = new THREE.Quaternion();
        qx.setFromAxisAngle(new THREE.Vector3(0,1,0), this.phi);

        const forward = new THREE.Vector3(0,0,-1);
        forward.applyQuaternion(qx);
        forward.multiplyScalar(forwardVelocity * delta * 10);

        const left = new THREE.Vector3(-1,0,0);
        left.applyQuaternion(qx);
        left.multiplyScalar(strafeVelocity * delta * 10);

        this.translation.add(forward);
        this.translation.add(left);
    }

    updateRotation(delta){
        const xh = this.input.current.mouseDelta.x / window.innerWidth;
        const yh = this.input.current.mouseDelta.y / window.innerHeight;

        this.phi += -xh * 5;
        this.theta = this.clamp(this.theta + -yh * 5, -Math.PI/3, Math.PI/3);

        const qx = new THREE.Quaternion();
        qx.setFromAxisAngle(new THREE.Vector3(0,1,0), this.phi);

        const qz = new THREE.Quaternion();
        qz.setFromAxisAngle(new THREE.Vector3(1,0,0), this.theta);

        const q = new THREE.Quaternion();
        q.multiply(qx);
        q.multiply(qz);

        this.rotation.copy(q);
    }

    clamp(val, min, max){
        return Math.min(Math.max(val, min), max);
    } 
}

export default FirstPersonCamera;
