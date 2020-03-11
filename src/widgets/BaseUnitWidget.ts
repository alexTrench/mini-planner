import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { History } from "engine/History";
import { IModelData } from "data/ModelData";

export class BaseUnitWidget extends Widget {
    type: string = "base unit";
    borderColour: string = "#72757B";
    fillColour: string = "#FFFEE7";
    material: string = "#FFFFFF";
    constructor(
        eventBus: EventBus,
        history: History,
        model: IModelData,
        id: number
    ) {
        super(eventBus, history, model, id);
    }

    public update() {}
}
