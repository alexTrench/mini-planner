import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";
import { History } from "engine/History"

export class DecorPanelWidget extends Widget {
    protected fillColour: string = "#131314";
    protected borderColour: string = "#131314";
    type: string = "decor panel";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, history: History, model: IModelData, id: number) {
        super(eventBus, history, model, id);
        this.id = id;
    }

    public update(eventBus: EventBus) {
        return eventBus;
    }
}
