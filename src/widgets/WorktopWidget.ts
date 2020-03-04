import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";

export class WorktopWidget extends Widget {
    public borderColour: string;
    public fillColour: string = "#F0F0F0";
    constructor(
        eventBus: EventBus,
        transform: Transform,
        dimensions: Vec3,
        material: string,
        id: number
    ) {
        super(eventBus, transform, dimensions, id);
        this.borderColour = material;
    }

    public update() {}

    public render(context: CanvasRenderingContext2D): void {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);
    }

    public toJSON(): string {
        return "";
    }
}
