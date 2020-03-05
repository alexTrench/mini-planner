import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IWorktopWidgetInfo } from "engine/IWidgetObject";
import { WORKTOP_MATERIAL_BORDER_COLOUR } from "data/WorktopMaterialBorderDisplayColour";
import { IWorktopModelData } from "data/DefaultModelData";

export class WorktopWidget extends Widget {
    public borderColour: string;
    public fillColour: string = "#F0F0F0";
    type: string = "worktop";
    public material: string;

    constructor(eventBus: EventBus, model: IWorktopModelData, id: number) {
        super(eventBus, model, id);
        this.material = model.material;
        this.id = id;
        this.borderColour = this.material;
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(
            this.material
        )!.borderColour;
    }

    public update() {}

    public render(context: CanvasRenderingContext2D): void {
        this.renderTwoDimensionPolygon(
            context,
            this.fillColour,
            this.borderColour
        );
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
    }
}
