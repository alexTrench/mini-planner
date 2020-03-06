import { Widget } from "widgets/Widget";
import { EventBus } from "engine/EventBus";
import { IWorktopWidgetInfo } from "engine/IWidgetObject";
import { WORKTOP_MATERIAL_BORDER_COLOUR } from "data/WorktopMaterialBorderDisplayColour";
import { IWorktopModelData } from "data/ModelData";

export class WorktopWidget extends Widget<IWorktopModelData> {
    public borderColour: string;
    public fillColour: string = "#F0F0F0";

    protected type = "worktop";

    constructor(eventBus: EventBus, model: IWorktopModelData, id: number) {
        super(eventBus, model, id);
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(model.material)!;
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
        const { dimensions, material } = this.model;

        const widgetInfo = super.toJSON() as IWorktopWidgetInfo;

        const { x, z } = dimensions.divScalar(2);

        widgetInfo.material = material;
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
