import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";

export class BaseUnitWidget extends Widget {
    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
        this.id = id;
    }
    type: string = "base unit";
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";
    material: string = "#FFFFFF";

    public update() {}

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }
}
