/**
 * The sprite class will contain everything that a sprite needs to be placed into the website.
 */
class Sprite{
    /**
    * The constructor of Sprite Class.
    * @param {Phaser.Scene} scene The scene to place the 2D sprites in the game.
    * @param {{x: Number, y: Number, ang: Number}} originInfo A literal Object with the initial positioning information for the sprite.
    * @param {String} spriteImgStr An str of the image name given in the preload method of the main class.
    */
    constructor(scene, originInfo, spriteImgStr){
        this.scene = scene;
        this.originInfo = originInfo;
        this.spriteImgStr = spriteImgStr;

        this.debug = false;
    }

    /**
     * Gets the scene of the sprite.
     * @return {Scene} The scene of the sprite.
     */
    getScene(){
        return this.scene;
    }

    /**
     * Sets if the sprite should show the rays or not.
     * @param {Boolean} value
     */
    setDebug(value){
        this.debug = value;
    }

    /**
     * Gets if the sprite should show the rays or not.
     * @returns {boolean}
     */
    getDebug(){
        return this.debug;
    }

    /**
     * Gets the depth of the sprite.
     * @returns {Number}
     */
    getDepth(){
        return this.depth;
    }

    /**
     * Gets the sprite origin info.
     * @return {{x: Number, y: Number, angleOffset: Number}}
     */
    getOriginInfo(){
        return this.originInfo;
    }

    /**
     * Gets the sprite image string.
     * @return {String} The image string of the sprite.
     */
    getSpriteImgStr(){
        return this.spriteImgStr;
    }

    /**
     * Sets the position in X axis of the sprite.
     * @param {Number} value
     */
    setPositionX(value){
        this.x = value;
    }

    /**
     * Gets the position in X axis of the sprite.
     * @returns {Number}
     */
    getPositionX(){
        return this.x;
    }

    /**
     * Sets the position in Y axis of the sprite.
     * @param {Number} value
     */
    setPositionY(value){
        this.y = value;
    }

    /**
     * Gets the position in Y axis of the sprite.
     * @returns {Number}
     */
    getPositionY(){
        return this.y;
    }

    /**
     * Sets the position in X and Y axis of the sprite.
     * @param {Number} valueX
     * @param {Number} valueY
     */
    setPosition(valueX, valueY = valueX){
        this.setPositionX(valueX);
        this.setPositionY(valueY);
    }

    /**
     * Gets the position in X and Y axis of the sprite.
     * @returns {Number}
     */
    getPosition(){
        return {x: this.x, y: this.y};
    }
    /**
     * Sets the visibility of the sprite.
     * @param {boolean} visible Whether the sprite is visible or not.
     */
    setVisible(visible = true){
        this.visible = visible;
    }

    /**
     * Gets the visibility of the sprite.
     * @returns {boolean}
     */
    getVisible(){
        return this.visible;
    }

    /**
     * Sets the scale of the sprite along the X axis.
     * @param {Number} value
     */
    setScaleX(value){
        this.scaleX = value;
    }

    /**
     * Sets the scale of the sprite along the Y axis.
     * @param {Number} value
     */
    setScaleY(value){
        this.scaleY = value;
    }

    /**
     * Gets the angle of the sprite in Radians.
     * @returns {Number}
     */
    getAngleRadians(){
        return this.angle*Math.PI/180;
    }
}