import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";
import { History } from "engine/History"

export class BaseUnitWidget extends Widget {
    constructor(eventBus: EventBus, history: History, model: IModelData, id: number) {
        super(eventBus, history, model, id);
        this.id = id;
    }
    type: string = "base unit";
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";
    material: string = "#FFFFFF";

    public update() {}
}
