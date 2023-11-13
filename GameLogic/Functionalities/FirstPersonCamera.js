import * as THREE from "three";

class FirstPersonCamera extends THREE.PerspectiveCamera{
    constructor(fov, aspect, near, far, position){
        super(fov, aspect, near, far);
        this.position.fromArray(position);
        this.inMovement = false;
        this.sprintingMultiplier = 1;

        this.headBobActive = false;
        this.headBobtimer = 0;
    }

    update(delta, isMoving){
        this.updateHeadBob(delta, isMoving);
    }
    
    updateHeadBob(delta){
        if(this.headBobActive){
            this.headBobtimer += delta;
            this.headBobActive = false;
        }
        
        if(this.inMovement){
            this.position.y = 0.3*Math.sin(this.headBobtimer*5*this.sprintingMultiplier) + 2;
            this.position.x = 0.3*Math.cos(this.headBobtimer*2.5*this.sprintingMultiplier);
        }
    }
}

export default FirstPersonCamera;
