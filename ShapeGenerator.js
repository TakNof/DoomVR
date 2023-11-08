import * as THREE from "three";

class ShapeGenerator extends THREE.Mesh{
    constructor(shape, data, materialType = "Basic", config = {color: 0x1EA5DC}){
        super(
            new THREE[`${shape}Geometry`](...data),
            new THREE[`Mesh${materialType}Material`](config)
        );
        this.shape = shape;
    }
}

export default ShapeGenerator;