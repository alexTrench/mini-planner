import {Widget} from './Widget';
import {Transform} from "engine/Transform";
import {EventBus} from "engine/EventBus";
import {Vec3} from "engine/Vec3";


export class WallUnitWidget extends Widget {
    // private t = 0;
    protected fillColour = '#E5EBF7';
    protected borderColour = '#72757B';

    constructor(eventBus: EventBus, transform: Transform, dimensions: Vec3, id: number) {
        super(eventBus, transform, dimensions, id);
        this.id = id;
    }

    public update(_eventBus: EventBus) {
        // this.transform.rotation = this.t % (Math.PI * 2);
        // this.t += 0.05;
    }

    public render(context: CanvasRenderingContext2D): void {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);
    }

    public toJSON(): string {
        return "toJSON method from WallUnitWidget called";
    }

}

