class InputController{
    constructor(giroscopeObject, cameraSensibility){
        this.#initialize(giroscopeObject, cameraSensibility);
    }

    #initialize(giroscopeObject, cameraSensibility = 0){
        this.current = {
            leftButton: false,
            rightButton: false,
            mousePosition: {
                x: 0,
                y: 0
            },
            mouseDelta:{
                x: 0,
                y: 0
            }
        };

        this.previous = null;
        this.keys = {};
        this.previousKeys = {};
        this.pointerLocked = false;
        this.mouseTimeout = setTimeout(() =>{
            this.current.mouseDelta.x  = 0;
            this.current.mouseDelta.y = 0;
        }, 100);

        this.cameraSensibility = cameraSensibility;

        this.keyCodes = {};
        this.keyCodesFromCode = {};

        for (let i = 0; i < 128; i++) {
            let char = String.fromCharCode(i);

            this.keyCodes[char] = i;
            this.keyCodesFromCode[i] = char;
        }

        this.createGiroscope(giroscopeObject);

        let events = ["MouseDown", "MouseUp", "MouseMove", "KeyDown", "KeyUp"];

        for(let event of events){
            document.body.addEventListener(event.toLowerCase(), (e) => this[`on${event}`](e), false);
        }

        document.body.addEventListener("click", async () => {
            await document.body.requestPointerLock({
                unadjustedMovement: true,
            });
        });
        
        document.addEventListener("pointerlockchange", () =>{
            this.pointerLocked = document.pointerLockElement === document.body;
        }, false);
    }

    key(keyCode){
        return this.keys[keyCode];
    }
    
    onMouseDown(e){
        // console.log("onMouseDown")
        switch(e.button){
            case 0:
                this.current.leftButton = true;
            break;

            case 2:
                this.current.rightButton = true;
            break;
        }
    }

    onMouseUp(e){
        switch(e.button){
            case 0:
                this.current.leftButton = false;
            break;

            case 2:
                this.current.rightButton = false;
            break;
        }
    }

    onMouseMove(e){
        if(this.pointerLocked){
            clearTimeout(this.mouseTimeout);
            this.current.mousePosition.x += e.movementX*0.1 * this.cameraSensibility;
            this.current.mousePosition.y += e.movementY*0.1 * this.cameraSensibility;

            if(this.previous === null){
                this.previous = JSON.parse(JSON.stringify(this.current));
            }

            this.current.mouseDelta.x = this.current.mousePosition.x - this.previous.mousePosition.x;
            this.current.mouseDelta.y = this.current.mousePosition.y - this.previous.mousePosition.y;

            this.mouseTimeout = setTimeout(() =>{
                this.current.mouseDelta.x  = 0;
                this.current.mouseDelta.y = 0;
            }, 100);
        }
    }

    onKeyDown(e){
        this.keys[e.keyCode] = true;
    }

    onKeyUp(e){
        this.keys[e.keyCode] = false;
    }

    checkGamepad(){
        for(let gamepad of navigator.getGamepads()){
            if(gamepad){
                this.gamepad = gamepad;
                this.gamepad.inputTranslator = {
                    0: 32,
                    12: 87,
                    13: 83,
                    14: 65,
                    15: 68,
                    10: 16,
                    7: "leftButton",
                    6: "rightButton"
                }
            }
        }
        this.getGamepads = null;
    }

    gamepadController(){
        if(this.gamepad){
            for(let [i, button] of this.gamepad.buttons.entries()){
                if(button.pressed && this.gamepad.inputTranslator[i] != null){
                    if(i >= 6 && i <= 7){
                        this.current[this.gamepad.inputTranslator[i]] = true;
                    }else{
                        this.keys[this.gamepad.inputTranslator[i]] = true;
                    }
                }else{
                    if(i >= 6 && i <= 7){
                        this.current[this.gamepad.inputTranslator[i]] = false;
                    }else{
                        this.keys[this.gamepad.inputTranslator[i]] = false;
                    }
                }
            }
        }
    }

    createGiroscope(giroscopeObject){
        this.giroscopeControls =  new THREE.DeviceOrientationControls(giroscopeObject);

        if(this.giroscopeControls.device == null){
            this.giroscopeControls.enabled = false;
        }
    }

    update(){
        this.previous = JSON.parse(JSON.stringify(this.current));
        this.checkGamepad();
        this.gamepadController();

        if(this.giroscopeControls.enabled){
            this.giroscopeControls.update();
        }
    }
}

export default InputController;