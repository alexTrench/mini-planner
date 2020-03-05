import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IWorktopWidgetInfo } from "engine/IWidgetObject";
import {WORKTOP_MATERIAL_BORDER_COLOUR} from "data/WorktopMaterialBorderDisplayColour";

export class WorktopWidget extends Widget {
    public borderColour: string;
    public fillColour: string = "#F0F0F0";
    type: string = "worktop";
    material: string;
    constructor(
        eventBus: EventBus,
        transform: Transform,
        dimensions: Vec3,
        material: string,
        id: number
    ) {
        super(eventBus, transform, dimensions, id);
        this.id = id;

        this.material = material;
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(material)!.borderColour;
    }

    public update() {}

    public render(context: CanvasRenderingContext2D): void {

        this.renderTwoDimensionPolygon(context, this.fillColour, this.borderColour);

    }

    public toJSON(): IWorktopWidgetInfo {
        const widgetInfo = super.toJSON() as IWorktopWidgetInfo;

        const { x, z } = this.dimensions.divScalar(2);

        widgetInfo.points = [
            { x: -x, z: -z },
            { x, z: -z },
            { x, z },
            { x: -x, z }
        ];

        console.log(widgetInfo);
        return widgetInfo;
    };
}

