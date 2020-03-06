import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";
import { History } from "engine/History"

export class WallUnitWidget extends Widget {
    protected fillColour = "#E5EBF7";
    protected borderColour = "#72757B";
    type: string = "wall unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, history: History, model: IModelData, id: number) {
        super(eventBus, history, model, id);
        this.id = id;
    }

    public update(_eventBus: EventBus) {

    }
}
