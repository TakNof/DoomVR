import * as THREE from "three";
import ShapeGenerator from "../../ShapeGenerator.js";

/**
 * This class extends to Sprite class, due the "living" sprites count with
 * some diferente properties then the "not-living" ones.
 */
class Living{
    /**
    * The constructor of Living Class.
    * @constructor
    * @param {THREE.Scene} scene The scene to place the living element.
    * @param {[...Number]} originInfo A literal Object with the initial positioning information for the sprite.
    * @param {String} spriteImgStr An str of the image name given in the preload method of the main class.
    * @param {Number} depth The depth of rendering of the sprite.
    * @param {Number} size The size of the sprite in pixels.
    * @param {Number} defaultVelocity The default velocity for the living sprite.
    * 
    */
    constructor(scene, originInfo, spriteImgStr, defaultVelocity){
        this.object = new ShapeGenerator("Box", [1,2,1], "Standard");
        this.object.position.fromArray(originInfo);
        
        this.angles = {phi: 0, theta: 0};

        this.scene = scene;
        this.spriteImgStr = spriteImgStr;
        this.debug = false;

        this.scene.add(this.object);

        this.defaultVelocity = defaultVelocity;
        
        this.velocityVector = new THREE.Vector3();
        this.acelerationVector = new THREE.Vector3();

        this.setLastShotTimer(0);

        this.isAlive = true;

        this.ableToShoot = true;
    }

    /**
     * Sets the timer of the last shot of the living sprite.
     * @param {Time} lastShotTimer
     */
    setLastShotTimer(lastShotTimer){
        this.lastShotTimer = lastShotTimer;
    }

    /**
     * Gets the timer of the last shot of the living sprite.
     * @return {Time} lastShotTimer
     */
    getLastShotTimer(){
        return this.lastShotTimer
    }    

    /**
     * Gets the default velocity of the living sprite.
     * @returns {number}
     */
    getDefaultVelocity(){
        return this.defaultVelocity;
    }


    /**
     * This method created the raycaster object of the sprite.
     * @param {number} raysAmount The amount of rays that the raycaster should calculate.
     * @param {number} depthOfFieldLimit The limit to render the walls of the world.
     * @param {number} angleOffset The angle offset of the projected rays from the sprite.
     */
    // setRaycaster(wallMatrix, angleOffset = 0, rayAmount = undefined) {
    //     this.raycaster = new Raycaster(this.getRotation() + angleOffset, this.getPosition(), rayAmount);
    //     this.raycaster.setMatrix(wallMatrix);
    //     this.getRaycaster().setAngleStep();
    // }

    /**
     * Gets the raycaster object of the sprite.
     * @returns {Raycaster}
     */
    // getRaycaster(){
    //     return this.raycaster;
    // }

    /**
     * This method sets the graphical representation of the rays thrown by the raycaster.
     * @param {String} colorOfRays The color of the rays.
     */
    // setSpriteRays(colorOfRays){
        // if(this.getDebug()){
        //     this.spriteRays = new Rays(this.getScene(), options.quality.value, this.getPosition(), colorOfRays);
        //     this.spriteRays.setInitialRayAngleOffset(this.getOriginInfo().angleOffset);
        // }
    // }

    /**
     * Gets the graphical representation of the rays thrown by the raycaster.
     * @returns {Rays}
     */
    // getSpriteRays(){
        // return this.spriteRays;
    // }

    /**
     * Sets the elements to collide with.
     */
    // setColliderElements(){
    //     if(this.getSpriteRays() === undefined){
    //         this.colliderElements = this;
    //     }else{
    //         this.colliderElements = [...[this], ...this.getSpriteRays().rays];
    //     }
    // }

    /**
     * Gets the elements to collide with.
     * @returns {Array}
     */
    // getColliderElements(){
    //     return this.colliderElements;
    // }
    
    /**
     * Sets the sprite sounds to be played.
     * @param {String} name
     * @param {Array<String>} soundNames
     */
    // setSpriteSounds(name, ...soundNames){
    //     this.spriteSounds = {};
        
    //     if(Array.isArray(soundNames[0])){
    //         soundNames = soundNames[0];
    //     }

    //     for(let element of soundNames){
    //         this.spriteSounds[element] = new Sound(this.getScene(), `${name}_${element}_sound`);
    //         if(element == "heal"){
    //             this.spriteSounds[element].sound.setVolume(10);
    //         }
    //     }
    // }

    /**
     * Gets the sprite sound specified by the given name.
     * @param {String} element The name of the sound to retrieve.
     * @returns {Sound}
     */
    // getSpriteSounds(element){
    //     if(!element){
    //         return this.spriteSounds;
    //     }else{
    //         return this.spriteSounds[element];
    //     }
    // }

    /**
     * Sets the max health of the living sprite.
     * @param {Number} maxHealth
     */
    setMaxHealth(maxHealth){
        this.maxHealth = maxHealth;
        this.setHealth(maxHealth);
    }

    /**
     * Gets the max health of the living sprite.
     * @returns {Number}
     */
    getMaxHealth(){
        return this.maxHealth;
    }

    /**
     * Sets the current health of the living sprite.
     * @param {Number} health
     */
    setHealth(health){
        this.health = health;
    }

    /**
     * Gets the current health of the living sprite.
     * @return {Number}
     */
    getHealth(){
        return this.health;
    }

    /**
     * 
     * @param {Number} healValue 
     */
    // heal(healValue){
    //     if(this.getHealth() != this.getMaxHealth()){
    //         if(this.getHealth() + healValue > this.getMaxHealth()){
    //             this.setHealth(this.getMaxHealth());
    //         }else{
    //             this.setHealth(this.getHealth() + healValue);
    //             this.getSpriteSounds("heal").playSound();
                
    //             this.getHUD().setHUDElementValue("health", this.getHealth(), true, "%");
    //             this.getHUD().displayHealRedScreen();
    //         }
    //     }
    // }

     /**
     * Sets the alive state of the Living Sprite.
     * @param {boolean} state
     */
    // setAbleToShoot(state){
    //     this.ableToShoot = state;
    // }

    /**
     * Gets the alive state of the Living Sprite.
     * @param {boolean} 
     */
    // getAbleToShoot(){
    //     return this.ableToShoot;
    // }
}

export default Living;