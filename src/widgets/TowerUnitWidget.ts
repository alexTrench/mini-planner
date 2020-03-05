import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";

export class TowerUnitWidget extends Widget {
    protected fillColour: string = "#FCE5F1";
    protected borderColour: string = "#72757B";
    type: string = "tower unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
        this.id = id;

        this.borderColour = "#72757B";
        this.fillColour = "#FCE5F1";
    }

    public update(_eventBus: EventBus): void {}

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }
}
