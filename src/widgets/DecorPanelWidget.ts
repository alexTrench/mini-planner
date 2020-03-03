import { Widget } from "./Widget";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { Vec2 } from "engine/Vec2";
import { EventBus } from "engine/EventBus";

export class DecorPanelWidget extends Widget {
    protected fillColour: string = "#131314";
    protected borderColour: string = "#131314";

    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3) {
        super(eventBus, transform, dimensions);
    }

    public update(eventBus: EventBus) {
        return eventBus;
    }

    public render(context: CanvasRenderingContext2D) {
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

    public toJSON() {
        return "";
    }
}
