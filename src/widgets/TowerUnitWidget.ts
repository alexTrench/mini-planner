import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";
import { History } from "engine/History"

export class TowerUnitWidget extends Widget {
    protected fillColour: string = "#FCE5F1";
    protected borderColour: string = "#72757B";
    type: string = "tower unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, history: History, model: IModelData, id: number) {
        super(eventBus, history, model, id);
        this.id = id;

        this.borderColour = "#72757B";
        this.fillColour = "#FCE5F1";
    }

    public update(_eventBus: EventBus): void {}
}
