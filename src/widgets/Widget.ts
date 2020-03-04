import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import {
    EventBus,
    MouseDown,
    MouseEventData,
    MouseMove
} from "engine/EventBus";
import {Vec2} from "../engine/Vec2";

export abstract class Widget {
    protected isSelected = false;
    protected isHovered = false;

    protected abstract fillColour: string;
    protected abstract borderColour: string;
    // Maybe add other colours for things?

    public constructor(
        eventBus: EventBus,
        public transform: Transform,
        public dimensions: Vec3,
        protected id:number
    ) {
        eventBus.subscribe(MouseDown, this.handleMouseClick.bind(this));
        eventBus.subscribe(MouseMove, this.handleMouseMove.bind(this));
    }

    public handleMouseClick(_mouse: MouseEventData): void {}

    public handleMouseMove(_mouse: MouseEventData): void {}

    public setDimensions(width: number, height: number, depth: number): void {
        this.dimensions.x = width;
        this.dimensions.y = height;
        this.dimensions.z = depth;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.transform.translation.x = x;
        this.transform.translation.y = y;
        this.transform.translation.z = z;
    }

    public setRotationY(y: number): void {
        this.transform.rotation = y;
    }

    public setScale(x: number, y: number, z: number): void {
        this.transform.scale.x = x;
        this.transform.scale.y = y;
        this.transform.scale.z = z;
    }
    /*
       To be used in rendering Vec2 widgets
     */
    public renderTwoDimensionPolygon(context: CanvasRenderingContext2D, fillColour: string, borderColour: string) {

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

        context.fillStyle = fillColour;
        context.strokeStyle = borderColour;
        context.beginPath();

        context.moveTo(polygon[0].x, polygon[0].z);

        for (const point of polygon) {
            context.lineTo(point.x, point.z);
        }

        context.closePath();
        context.stroke();
        context.fill();

    }


    public abstract update(eventBus: EventBus): void;
    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract toJSON(): string;
}
