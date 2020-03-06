import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { History } from "engine/History"
import { IModelData } from "data/ModelData";

export class WallUnitWidget extends Widget {
    protected fillColour = "#E5EBF7";
    protected borderColour = "#72757B";
    type: string = "wall unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, history: History, model: IModelData, id: number) {
        super(eventBus, history, model, id);
    }

    public update(_eventBus: EventBus) {

    }
}
