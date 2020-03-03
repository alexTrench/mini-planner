import { Widget } from 'widgets/Widget';
import { EventBus } from 'engine/EventBus';
import { Transform } from "./engine/Transform";
import { Vec3 } from "./engine/Vec3";
import { WallUnitWidget } from "./widgets/WallUnitWidget";

export class Kitchen {
    private widgets = new Array<Widget>();

    constructor(eventBus: EventBus) {

        const scaleVector = Vec3.New(0.2, 0.2, 0.2);

        //Wall Unit Size A
        const wallUnitSizeA = Vec3.New(600, 720, 400);
        const wallUnitWidgetA = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(400 * 0.2,0,50),
                Math.PI / 4,
                scaleVector),
            wallUnitSizeA
        );

        //Wall Unit Size B
        const wallUnitSizeB = Vec3.New(600, 720, 330);
        const wallUnitWidgetB = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(1100 * 0.2, 0 , 50),
                0,
                scaleVector),
            wallUnitSizeB
        );

        this.addToWidgets(wallUnitWidgetA, wallUnitWidgetB);

    }


    public update(eventBus: EventBus): void {
        for (const widget of this.widgets) {
            widget.update(eventBus);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }

    public addToWidgets(...newWidgets: Widget[]): void {
        this.widgets.push(...newWidgets);
    }
}
