import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";

export class BaseUnitWidget extends Widget {
    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3, id:number) {
        super(eventBus, transform, dimensions, id);
    }
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";

    public update() {}

    public render(context: CanvasRenderingContext2D): void {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);

    }

    public toJSON(): string {
        return "";
    }
}
