import {Widget} from './Widget';
import {Transform} from "../engine/Transform";
import {EventBus} from "../engine/EventBus";
import {Vec3} from "../engine/Vec3";
import {Vec2} from "../engine/Vec2";


export class WallUnitWidget extends Widget {
    private t = 0;
    protected fillColour = '#E5EBF7';
    protected borderColour = '#72757B';

    /*
    * may be needed when functionality of choosing sizes is brought into the Class
    *
    protected scale = 0.2;
    protected sizeOption = 0;
    protected sizesAvailable = [{shallowUnit: {x: 720, y: 600, z: 400}}, {deepUnit: {x: 720, y: 600, d: 330}}]
    */

    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3) {
        super(eventBus, transform, dimensions);
        /*
         * may be needed when functionality of choosing sizes is brought into the Class
        *
        const x = this.sizesAvailable[this.sizeOption].shallowUnit!.x;
        const y = this.sizesAvailable[this.sizeOption].shallowUnit!.y;
        const z = this.sizesAvailable[this.sizeOption].shallowUnit!.z;

        this.dimensions = Vec3.New(x, y, z);
        */


    }

    /*
     * may be needed when functionality of choosing sizes is brought into the Class
     *
    public chooseSize(option: number): void {
        this.sizeOption = option;
    }
    */


    public update(_eventBus: EventBus) {
        this.transform.rotation = this.t % (Math.PI * 2);
        this.t += 0.05;
    }

    public render(context: CanvasRenderingContext2D): void {
        const halfWidth = this.dimensions.x / 2;
        const halfHeight = this.dimensions.z / 2;

        const polygon = [
            Vec2.New(-halfWidth, -halfHeight),
            Vec2.New(halfWidth, -halfHeight),
            Vec2.New(halfWidth, halfHeight),
            Vec2.New(-halfWidth, halfHeight)
        ];

        const transformMatrix = this.transform.getTransformationMatrix();

        for (const point of polygon) {
            point.transformInPlace(transformMatrix);
        }

        context.fillStyle = this.fillColour;
        context.strokeStyle = this.borderColour;
        context.beginPath();

        context.moveTo(polygon[0].x, polygon[0].z);

        for (const point of polygon) {
            context.lineTo(point.x, point.z);
        }

        context.closePath();
        context.stroke();
        context.fill();

    }

    public toJSON(): string {
        return "toJSON method from WallUnitWidget called";
    }

}

