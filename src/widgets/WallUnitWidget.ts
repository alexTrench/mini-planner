import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";

export class WallUnitWidget extends Widget {
    protected fillColour = "#E5EBF7";
    protected borderColour = "#72757B";
    type: string = "wall unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
        this.id = id;
    }

    public update(_eventBus: EventBus) {

    }

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }

}
