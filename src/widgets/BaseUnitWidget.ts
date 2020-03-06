import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/ModelData";

export class BaseUnitWidget extends Widget {
    type: string = "base unit";
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";

    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
    }

    public update() {}

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }
}
