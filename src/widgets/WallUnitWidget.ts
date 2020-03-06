import { Widget } from "./Widget";
import { EventBus } from "engine/EventBus";
import { IModelData } from "data/DefaultModelData";

export class WallUnitWidget extends Widget {
    // private t = 0;
    protected fillColour = "#E5EBF7";
    protected borderColour = "#72757B";
    type: string = "wall unit";
    material: string = "#FFFFFF";

    constructor(eventBus: EventBus, model: IModelData, id: number) {
        super(eventBus, model, id);
        this.id = id;
    }

    public update(_eventBus: EventBus) {
        // this.transform.rotation = this.t % (Math.PI * 2);
        // this.t += 0.05;
    }
}
