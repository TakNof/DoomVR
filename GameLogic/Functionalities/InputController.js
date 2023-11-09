class InputController{
    constructor(sensibility){
        this.#initialize(sensibility);
    }

    #initialize(sensibility = 0){
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
        this.mouseTimeout = null;
        this.sensibility = sensibility;

        this.keyCodes = {};

        for (let i = 0; i < 128; i++) {
            let char = String.fromCharCode(i);

            this.keyCodes[char] = i;
        }

        let events = ["MouseDown", "MouseUp", "MouseMove", "KeyDown", "KeyUp"];

        for(let event of events){
            document.body.addEventListener(event.toLowerCase(), (e) => this[`on${event}`](e), false);
        }

        document.body.addEventListener("click", async () => {
            await document.body.requestPointerLock({
                unadjustedMovement: false,
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
            this.current.mousePosition.x += e.movementX*0.1 * this.sensibility;
            this.current.mousePosition.y += e.movementY*0.1 * this.sensibility;

            if(this.previous === null){
                this.previous = JSON.parse(JSON.stringify(this.current));
            }

            this.current.mouseDelta.x = this.current.mousePosition.x - this.previous.mousePosition.x;
            this.current.mouseDelta.y = this.current.mousePosition.y - this.previous.mousePosition.y;

            this.mouseTimeout = setTimeout(() =>{
                this.current.mouseDelta.x  = 0;
                this.current.mouseDelta.y = 0;
            }, 100);
            // console.log(this.current.mouseDelta);
        }
    }

    onKeyDown(e){
        this.keys[e.keyCode] = true;
    }

    onKeyUp(e){
        this.keys[e.keyCode] = false;
    }

    update(){
        this.previous = JSON.parse(JSON.stringify(this.current));
    }
}

export default InputController;