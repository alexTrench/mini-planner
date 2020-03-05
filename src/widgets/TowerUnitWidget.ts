import { Widget } from "widgets/Widget";
import { Vec3 } from "engine/Vec3";
import { EventBus } from "engine/EventBus";
import { Transform } from "engine/Transform";

export class TowerUnitWidget extends Widget {
    protected fillColour: string = "#FCE5F1"
    protected borderColour: string = "#72757B";
    type: string = "tower unit";
    material: string = "#FFFFFF";

    constructor(
        eventBus: EventBus,
        public transform: Transform,
        public dimensions: Vec3,

        id: number
    ) {
        super(eventBus, transform, dimensions, id);
        this.id = id;

        this.borderColour = "#72757B";
        this.fillColour = "#FCE5F1";

    }

    public update(_eventBus: EventBus): void {

    }

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }
}
