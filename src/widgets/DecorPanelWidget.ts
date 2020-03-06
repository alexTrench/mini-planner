import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/ModelData";

export class DecorPanelWidget extends Widget {
    protected fillColour: string = "#131314";
    protected borderColour: string = "#131314";
    type: string = "decor panel";

    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
    }

    public update(eventBus: EventBus) {
        return eventBus;
    }

    public render(context: CanvasRenderingContext2D) {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
    }

}
