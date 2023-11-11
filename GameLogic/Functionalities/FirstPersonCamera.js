import * as THREE from "three";

class FirstPersonCamera extends THREE.PerspectiveCamera{
    constructor(fov, aspect, near, far, position){
        super(fov, aspect, near, far);
        this.position.fromArray(position);
        this.headBobActive = false;
        this.headBobtimer = 0;
    }

    update(delta, rotation){
        this.updateHeadBob(delta);
    }
    
    updateHeadBob(delta){
        if(this.headBobActive){
            this.headBobtimer += delta;
            this.headBobActive = false;
        }

        this.position.y = 0.3*Math.sin(this.headBobtimer*10) + 2;
        this.position.x = 0.3*Math.sin(this.headBobtimer*5) + 2;
    }
}

export default FirstPersonCamera;
