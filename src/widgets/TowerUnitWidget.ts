import { Widget } from "./Widget";
import { Vec3 } from "../engine/Vec3";
import { EventBus } from "../engine/EventBus";
import { Transform } from "../engine/Transform";

export class TowerUnitWidget extends Widget {
    protected fillColour: string;
    protected borderColour: string;
    constructor(
        eventBus: EventBus,
        public transform: Transform,
        public dimensions: Vec3,
        id: number
    ) {
        super(eventBus, transform, dimensions, id);

        this.borderColour = "#72757B";
        this.fillColour = "#FCE5F1";
    }

    public update(/*eventBus: EventBus*/): void {
        console.log(/*eventBus*/);
    }

    public render(context: CanvasRenderingContext2D): void {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);
    }
    public toJSON(): string {
        return "emptystring";
    }
}
