import { Widget } from "./Widget";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { EventBus } from "engine/EventBus";

export class DecorPanelWidget extends Widget {
    protected fillColour: string = "#131314";
    protected borderColour: string = "#131314";

    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3, id: number) {
        super(eventBus, transform, dimensions, id);
        this.id = id;
    }

    public update(eventBus: EventBus) {
        return eventBus;
    }

    public render(context: CanvasRenderingContext2D) {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);
    }

    public toJSON() {
        return "";
    }
}
