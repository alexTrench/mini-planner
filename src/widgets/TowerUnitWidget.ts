import { Widget } from "./Widget";
import { Vec3 } from "../engine/Vec3";
import { EventBus } from "../engine/EventBus";
import { Transform } from "../engine/Transform";
import { Vec2 } from "engine/Vec2";

export class TowerUnitWidget extends Widget {
    protected fillColour: string;
    protected borderColour: string;
    constructor(
        eventBus: EventBus,
        public transform: Transform,
        public dimensions: Vec3
    ) {
        super(eventBus, transform, dimensions);

        this.borderColour = "#72757B";
        this.fillColour = "#FCE5F1";
    }

    public update(/*eventBus: EventBus*/): void {
        console.log(/*eventBus*/);
    }

    public render(context: CanvasRenderingContext2D): void {
        const halfWidth = this.dimensions.x / 2;
        const halfDepth = this.dimensions.z / 2;
        const polygon = [
            Vec2.New(-halfWidth, -halfDepth),
            Vec2.New(halfWidth, -halfDepth),
            Vec2.New(halfWidth, halfDepth),
            Vec2.New(-halfWidth, halfDepth)
        ];

        const transformMatrix = this.transform.getTransformationMatrix();

        for (const point of polygon) {
            point.transformInPlace(transformMatrix);
        }

        context.beginPath();
        context.moveTo(polygon[0].x, polygon[0].z);
        for (const point of polygon) {
            context.lineTo(point.x, point.z);
        }
        context.closePath();
        context.fillStyle = this.fillColour;
        context.fill();
        context.strokeStyle = this.borderColour;
        context.stroke();
    }
    public toJSON(): string {
        return "emptystring";
    }
}
