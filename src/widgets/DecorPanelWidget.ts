import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { History } from "engine/History";
import { IModelData } from "data/ModelData";

export class DecorPanelWidget extends Widget {
    protected fillColour: string = "#131314";
    protected borderColour: string = "#131314";
    type: string = "decor panel";
    material: string = "#FFFFFF";

    constructor(
        eventBus: EventBus,
        history: History,
        model: IModelData,
        id: number
    ) {
        super(eventBus, history, model, id);
    }

    public update(eventBus: EventBus) {
        return eventBus;
    }
}
