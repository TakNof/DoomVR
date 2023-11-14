import * as THREE from "three";

import FirstPersonCamera from "../Functionalities/FirstPersonCamera.js";
import InputController from "../Functionalities/InputController.js";
import Living from "./Living.js";
import ShapeGenerator from "../../ShapeGenerator.js";


 /**
 * This class extends to Living class, due the "living" sprites could be
 * players or enemies. Furthermore, this class implements all the movement controlers for the player/s.
 */
class Player extends Living{
    /**
    * The constructor of Player Class.
    * @constructor
    * @param {Phaser.Scene} scene2D The scene to place the 2D sprites in the game.
    * @param {{x: Number, y: Number, ang: Number}} originInfo A literal Object with the initial positioning information for the sprite.
    * @param {String} spriteImgStr An str of the image name given in the preload method of the main class.
    * @param {Number} defaultVelocity The default velocity for the living sprite.
    * @param {Number} cameraSensibility The player angle operator in order to rotate the sprite arround.
    * @param {Number} maxHealth The maximum health of the player.
    * 
    */
    constructor(scene, originInfo, spriteImgStr, defaultVelocity, cameraSensibility, maxHealth){
        super(scene, originInfo, spriteImgStr, defaultVelocity);

        this.input = new InputController(this, cameraSensibility);

        this.setMaxHealth(maxHealth);

        // this.setSpriteSounds("player", "hurt", "death", "heal");

        this.damageDealed = 0;
        this.damageReceived = 0;
        this.lastSwitchWeaponTimer = 0;
        this.sprinting = false;

        // this.creationTime = this.getScene().time.now;
    }

    /**
     * Gets the angle operator to determine the amount of rotation of the player sprite.
     * @return {number}
     */
    getCameraSensibility(){
        return this.input.cameraSensibility;
    }

    /**
     * Sets the HUD object of the player.
     * @param {Object} canvasSize
     */
    // setHUD(enemies = undefined){
    //     this.hud = new HUD(this.scene3D, enemies);
    //     this.hud.setHUDElementValue("health", this.getHealth(), true, "%");
    // }

    // /**
    //  * Gets the HUD object of the player.
    //  * @returns {HUD}
    //  */
    // getHUD(){
    //     return this.hud;
    // }

    /**
     * Sets the camera of the player.
     * @param {number} fov in radians.
     */
    setCamera(fov, maxFov, aspect, near, far){
        this.camera = new FirstPersonCamera(fov, aspect, near, far, [0, this.object.geometry.parameters.height, 0]);
        this.camera.OgFov = fov;
        this.camera.maxFov = maxFov;
        // this.camera.fovLinspace = this.linspace(fov, maxFov, 0.01);
        this.object.add(this.camera);

        this.cameraHelper = new THREE.CameraHelper( this.camera );
        this.scene.add(this.cameraHelper);
    }

    /**
     * Gets the camera of the player.
     * @returns {Camera}
     */
    getCamera(){
        return this.camera;
    }

    updateCamera(fov){
        this.camera.projectionMatrix.makePerspective( fov, this.camera.aspect, this.camera.near, this.camera.far );
    }

    /**
     * Sets the list of weapons of the player.
     * @param {Array<Object>} weapons
     */
    // setWeapons(weapons){
    //     this.weapons = new Array(weapons.length);

    //     for(let [i, weapon] of weapons.entries()){
    //         this.weapons[i] = new Weapon(
    //             this.getScene3D(),
    //             {x: canvasSize.width/2, y: canvasSize.height*0.9},
    //             weapon.name,
    //             1000,
    //             weapon.bulletProperties,
    //             weapon.distanceLimits,
    //             weapon.animationParams
    //         )
    //         this.weapons[i].setProjectiles(this.getScene());
    //         this.weapons[i].setVisible(false);
    //     }
    //     this.setCurrentWeapon(this.weapons[0]);        
    // }

    /**
     * Sets the weapon Mesh of the player to display the sprites.
     * @param {[...Number]} Position
     */
    setWeaponObject(position = [0,0,0]){
        this.weaponObject = new ShapeGenerator("Box", [0.5, 0.5, 2], "Standard");
        this.object.add(this.weaponObject);

        this.weaponObject.defaultPosition = new THREE.Vector3().fromArray(position);
        this.weaponObject.aimingPosition = new THREE.Vector3(0, this.object.geometry.parameters.height*0.8, position[2]);

        this.weaponObject.position.copy(this.weaponObject.defaultPosition);
    }

    /**
     * Gets the list of weapons of the player.
     * @returns {Array<Weapon>}
     */
    // getWeapons(){
    //     return this.weapons;
    // }

    /**
     * Sets the current weapon of the player.
     * @param {Weapon} weapon
     */
    // setCurrentWeapon(weapon){
    //     this.currentWeapon = weapon;
    //     this.currentWeapon.setVisible(true);
    // }

    /**
     * Gets the current weapon of the player.
     * @return {Weapon}
     */
    // getCurrentWeapon(){
    //     return this.currentWeapon;
    // }

    /**
     * Checks if the living sprite have been impacted by a projectile or not.
     * @param {Living} shooter The living object which has shot THIS living object.
     */
    // evalProjectileCollision(shooter){
    //     let thisObject = this;
    //     this.getScene().physics.collide(this, shooter.getProjectiles2D(),
    //         function(sprite, projectile){
    //             let index = shooter.getProjectiles2D().getChildren().indexOf(projectile);
    //             let projectile3D = shooter.getProjectiles3D().getChildren()[index];
    //             thisObject.__checkDamage(
    //                 projectile,
    //                 projectile3D,
    //                 shooter.getBulletProperties(),
    //                 shooter.getDistanceLimits(),
    //                 shooter.getDistanceToPlayer()
    //             );
    //         }
    //     );
    // }

    /**
     * This method is called when a projectile has collided with a living sprite,
     * here he health and the state of the living sprite is determined by the
     * damage and limit distances of the projected projectiles.
     * @param {Projectile} projectile 
     * @param {Number} damage 
     * @param {Object} distanceLimits 
     * @param {Number} currentDistance
     */
    // __checkDamage(projectile, projectile3D, bulletProperties, distanceLimits, currentDistance){
    //     projectile.body.reset(-100, -100); 

    //     projectile.setActive(false);
    //     projectile.setVisible(false);

    //     projectile3D.body.reset(-100, -100); 

    //     projectile3D.setActive(false);
    //     projectile3D.setVisible(false);

    //     let damage = bulletProperties.damage;

    //     if(currentDistance > distanceLimits.min && currentDistance < distanceLimits.max){
    //         damage *= 220/currentDistance;
    //         // console.log(`${this} Normal damage ${damage}`);
    //     }else if(currentDistance >= distanceLimits.max){
    //         damage *= 1/distanceLimits.max;
    //         // console.log(`${this} Minimal damage ${damage}`);
    //     }else if(currentDistance <= distanceLimits.min){
    //         damage *= bulletProperties.critical * 220/currentDistance;
    //         // console.log(`${this} Critical damage ${damage}`);
    //     }

    //     this.addDamageReceived(damage);

    //     if(this.getHealth() - damage <= 0){
    //         this.setHealth(0);
            
    //         this.getSpriteSounds("death").playSound();

    //         this.isAlive = false;

    //     }else{
    //         this.getSpriteSounds("hurt").playSound();
    //         this.getHUD().displayHurtRedScreen();
    //         this.setHealth(this.getHealth() - damage);
    //     }

    //     this.getHUD().setHUDElementValue("health", this.getHealth(), true, "%");
    // }

    /**
     * Sets the time the player has been alive.
     */
    // setTimeAlive(){
    //     this.timeAlive = (this.getScene().time.now - this.creationTime)/1000;
    // }

    /**
     * Gets the time the player has been alive.
     * @returns {Number}
     */    
    // getTimeAlive(){
    //     return this.timeAlive;
    // }

    // addDamageDealed(damage){
    //     this.damageDealed += damage;
    // }

    // getDamageDealed(){
    //     return this.damageDealed;
    // }

    // addDamageReceived(damage){
    //     this.damageReceived += damage;
    // }

    // getDamageReceived(){
    //     return this.damageReceived;
    // }

    // setScore(type){
    //     let score = {timeScore: 0, difficulty: 0, damageDealedScore: 0, damageReceivedScore: 0, totalScore: 0};
    //     let aux = ["I'm too young to die", "Hurt me Plenty", "Ultra-Violence", "Nightmare"];
    //     console.log(options.difficulty.setting)  ; 
    //     switch (type) {
    //         case "Victory":
    //             score.timeScore = `TIME ALIVE = ${Math.round(this.getTimeAlive())}s + BONUS`; 
    //             score.totalScore += (1000000/this.getTimeAlive());

    //             if(options.difficulty.setting == 0){
    //                 score.difficulty = `DIFICULTY = ${aux[options.difficulty.setting].toUpperCase()}, SCORE x${1}`;
    //             }else{
    //                 score.difficulty = `DIFICULTY = ${aux[options.difficulty.setting].toUpperCase()}, SCORE x${options.difficulty.setting * 10}`;
    //             }
    //             break;

    //         case "Defeat":
    //             score.timeScore = `TIME ALIVE = ${Math.round(this.getTimeAlive())}s`; 
    //             score.totalScore += this.getTimeAlive()*10;

    //             score.difficulty = `DIFICULTY = ${aux[options.difficulty.setting].toUpperCase()}`
    //             break;

    //         default:
    //             throw new Error("Invalid type: " + type);
    //     }
        
    //     score.damageDealedScore = `DAMAGE DEALED = ${Math.round(this.getDamageDealed())}`;
    //     score.damageReceivedScore = `DAMAGE RECIEVED = -${Math.round(this.getDamageReceived())}`;

    //     score.totalScore += this.getDamageDealed()*10;
    //     score.totalScore -= this.getDamageReceived()*10;

    //     if(type == "Victory"){
    //         if(options.difficulty.setting != 0){
    //             score.totalScore *= options.difficulty.setting * 10;
    //         }
    //     }
        
    //     this.score = score;
    //     this.score.totalScore = Math.round(score.totalScore/10)*10;
    // }

    // getScore(){
    //     return this.score;
    // }

    update(delta){
        this.input.update();
        this.camera.update(delta);
        this.movement(delta);
        this.jump(delta);
        this.updateWeapon(delta);

        // console.log(this.object.position);
    }


    updateTranslation(delta){
        const forwardVelocity = (this.input.key(this.input.keyCodes.W) ? 1 : 0) + (this.input.key(this.input.keyCodes.S) ? -1 : 0);
        
        const strafeVelocity = (this.input.key(this.input.keyCodes.A) ? 1 : 0) + (this.input.key(this.input.keyCodes.D) ? -1 : 0);

        let sprintingVelocityMult = 1; 

        if(this.isSprinting()){
            sprintingVelocityMult = 1.5;
            this.camera.fov = this.camera.maxFov;
        }else{
            this.camera.fov = this.camera.OgFov;
        }

        this.camera.sprintingMultiplier = sprintingVelocityMult;

        this.camera.updateProjectionMatrix();

        const qx = new THREE.Quaternion();
        qx.setFromAxisAngle(new THREE.Vector3(0,1,0), this.angles.phi);

        const forward = new THREE.Vector3(0,0,-1);
        forward.applyQuaternion(qx);
        forward.multiplyScalar(forwardVelocity * delta * this.defaultVelocity * sprintingVelocityMult);

        const left = new THREE.Vector3(-1,0,0);
        left.applyQuaternion(qx);
        left.multiplyScalar(strafeVelocity * delta * this.defaultVelocity * sprintingVelocityMult);

        // this.object.position.add(forward);
        // this.object.position.add(left);

        const sum = new THREE.Vector3().addVectors(forward, left)

        this.object.physics.config.velocityVector.x = sum.x;
        this.object.physics.config.velocityVector.z = sum.z;

        // this.object.physics.config.velocityVector.applyAxisAngle(new THREE.Vector3(0,1,0), this.angles.phi);



        if(forwardVelocity != 0 || strafeVelocity != 0){
            this.camera.headBobActive = true;
            this.camera.inMovement = true;
        }else{
            this.camera.inMovement = false;
            this.camera.headBobtimer = 0;
            this.camera.position.set(0, this.object.geometry.parameters.height, 0);
        }
    }

    updateRotation(delta){
        if(!this.input.giroscopeControls.enabled){
            const xh = this.input.current.mouseDelta.x / window.innerWidth;
            const yh = this.input.current.mouseDelta.y / window.innerHeight;

            this.angles.phi += -xh * 1;
            this.angles.theta = this.clamp(this.angles.theta + -yh * 1, -Math.PI/3, Math.PI/3);

            const qx = new THREE.Quaternion();
            qx.setFromAxisAngle(new THREE.Vector3(0,1,0), this.angles.phi);

            const qz = new THREE.Quaternion();
            qz.setFromAxisAngle(new THREE.Vector3(1,0,0), this.angles.theta);

            const q = new THREE.Quaternion();
            q.multiply(qx);
            q.multiply(qz);

            this.object.quaternion.copy(q);
        }else{
            this.angles.phi = this.input.giroscopeControls.alpha;
            this.angles.theta = this.input.giroscopeControls.beta;
        }
    }

    clamp(val, min, max){
        return Math.min(Math.max(val, min), max);
    }

    /**
     * This method allows the player to have the basic controls of movement according to the stablished parameters.
     * The movement only works through the key arrows.
     */
    movement(delta){
        this.updateTranslation(delta);
        this.updateRotation(delta);
    }

    jump(delta){
        const jumpAction = this.input.key(this.input.keyCodes[" "]) ? 1 : 0;
        
        if(this.object.physics.getPotentialEnergy() < 10 && jumpAction == 1){
            
            const jumpAmount = new THREE.Vector3(0,1,0).multiplyScalar(jumpAction * delta * this.camera.sprintingMultiplier*6);

            this.object.physics.config.velocityVector.y = jumpAmount.y;
        }
    }

    isSprinting(){
        return this.input.key(this.input.keyCodes[this.input.keyCodesFromCode[16]]);
    }

    shoot(){
        if(this.input.current.leftButton){
            
            let time = this.scene.scenePhysics.config.currentTime;

            if (time - this.getLastShotTimer() > 0.05) {
                let projectileVelocity = new THREE.Vector3(0,0,-0.1).applyEuler(this.object.rotation);
                let initialPosition = this.object.position.clone().add(this.weaponObject.position);

                let projectile = new ShapeGenerator("Sphere", [0.1, 16, 32], "Standard", {color: 0xFF00FF0, roughness: 0});
                projectile.position.copy(initialPosition);
                projectile.createPhysics(this.scene, {velocityVector: projectileVelocity});

                this.scene.scenePhysics.items.push(projectile);
                this.scene.add(projectile);

                this.setLastShotTimer(time);
            }
        }
    }

    updateWeapon(delta){
        this.updateWeaponPosition();
        this.shoot(delta);
    }

    updateWeaponPosition(){
        if(this.input.current.rightButton){
            this.weaponObject.position.copy(this.weaponObject.aimingPosition);
        }else{
            this.weaponObject.position.copy(this.weaponObject.defaultPosition);
        }
    }

    // /**
    //  * Allow the player to switch among the weapons.
    //  */
    // switchWeapons(){
    //     if(this.controls.shift.isDown){
    //         let time = this.getScene().time.now;
    //         if (time - this.lastSwitchWeaponTimer  > this.getCurrentWeapon().switchWeaponDelay) {
    //             this.getCurrentWeapon().playSwitchWeaponSound();

    //             this.getCurrentWeapon().setVisible(false);

    //             let index = this.weapons.indexOf(this.getCurrentWeapon());

    //             if(index == this.weapons.length - 1){
    //                 this.setCurrentWeapon(this.weapons[0]);
    //             }else{
    //                 this.setCurrentWeapon(this.weapons[index + 1]);
    //             }

    //             this.getCurrentWeapon().setVisible(true);

    //             this.lastShotTimer = 0;
    //             this.lastSwitchWeaponTimer = time;

    //             this.getHUD().setHUDElementValue("ammo", this.getCurrentWeapon().getProjectiles().countActive(false), false);
    //         }
    //     }
    // }

    // /**
    //  * Allows the player to reload the current weapon.
    //  */
    // reload(){
    //     if(this.controls.r.isDown){
    //         this.getCurrentWeapon().getProjectiles().createMultiple({
    //                 key: "bullet",
    //                 max: 10,
    //                 quantity: 10,
    //                 active: false,
    //                 visible: false
    //         });
    //         this.getHUD().setHUDElementValue("ammo", this.getCurrentWeapon().getProjectiles().countActive(false), false);
    //     }
    // }

    linspace(start, end, jump = 0.2){
        let totalData = Math.abs(end - start);
        totalData /= jump;
    
        let list = [];
    
        let value = start;
        while(list.length <= totalData){
            list.push( value );
            value += jump;
        }
        
        list.push(end);
    
        return list;
    }
}

export default Player;