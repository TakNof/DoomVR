class InputController{
    constructor(){
        this.#initialize();
    }

    #initialize(){
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

        this.previous = this.current;
        this.keys = {};
        this.previousKeys = {};

        let events = ["MouseDown", "MouseUp", "MouseMove", "KeyDown", "KeyUp"];

        for(let event of events){
            document.addEventListener(event.toLowerCase(), (e) => this[`on${event}`](e), false);
        }
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
        // console.log("onMouseMove")
        this.current.mousePosition.x = e.pageX - window.innerWidth/2;
        this.current.mousePosition.y = e.pageY - window.innerHeight/2;

        this.current.mouseDelta.x = this.current.mousePosition.x - this.previous.mousePosition.x;
        this.current.mouseDelta.y = this.current.mousePosition.y - this.previous.mousePosition.y;

        
        console.log(this.current.mousePosition, this.previous.mousePosition);

        // console.log(this.current.mouseDelta.x, this.current.mouseDelta.y);
    }

    onKeyDown(e){
        this.keys[e.keyCode] = true;
    }

    onKeyUp(e){
        this.keys[e.keyCode] = false;
    }

    update(){
        this.previous = {...this.current};
    }
}

export default InputController;