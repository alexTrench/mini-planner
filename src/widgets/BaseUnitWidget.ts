import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { Vec2 } from "engine/Vec2";
import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";

export class BaseUnitWidget extends Widget {
    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3) {
        super(eventBus, transform, dimensions);
    }
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";

    public update() {}

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
        for (var i = 1; i < polygon.length; i++) {
            context.lineTo(polygon[i].x, polygon[i].z);
        }
        context.closePath();
        context.fillStyle = this.fillColour;
        context.fill();
        context.strokeStyle = this.borderColour;
        context.stroke();
    }

    public toJSON(): string {
        return "";
    }
}
