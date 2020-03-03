import { Widget } from "widgets/Widget";
import { BaseUnitWidget } from "widgets/BaseUnitWidget";
import { WorktopWidget } from "widgets/WorktopWidget";
import { EventBus } from "engine/EventBus";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { WallUnitWidget } from "widgets/WallUnitWidget";
import { DecorPanelWidget } from "widgets/DecorPanelWidget";
import { TowerUnitWidget } from "widgets/TowerUnitWidget";

export class Kitchen {
    private widgets = new Array<Widget>();
    constructor(eventBus: EventBus) {
        // x: w, y: h, z: d
        const scaleVector = Vec3.New(0.2, 0.2, 0.2);

        // Base Unit Size A
        const baseUnitSizeA = Vec3.New(600, 720, 620);
        const baseUnitWidgetA = new BaseUnitWidget(
            eventBus,
            new Transform(Vec3.New(100, 0, 700 * 0.2), 0, scaleVector),
            baseUnitSizeA
        );

        // Base Unit Size B
        const baseUnitSizeB = Vec3.New(600, 720, 450);
        const baseUnitWidgetB = new BaseUnitWidget(
            eventBus,
            new Transform(Vec3.New(300, 0, 700 * 0.2), 0, scaleVector),
            baseUnitSizeB
        );

        //Wall Unit Size A
        const wallUnitSizeA = Vec3.New(600, 720, 400);
        const wallUnitWidgetA = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(400 * 0.2, 0, 50), Math.PI / 4, scaleVector),
            wallUnitSizeA
        );

        //Wall Unit Size B
        const wallUnitSizeB = Vec3.New(600, 720, 330);
        const wallUnitWidgetB = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(1100 * 0.2, 0, 50), 0, scaleVector),
            wallUnitSizeB
        );

        const decorForBaseUnitA = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(30, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 620)
        );

        const decorForBaseUnitB = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(50, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 430)
        );

        const decorForWallUnitA = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(70, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 400)
        );

        const decorForWallUnitB = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(90, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 330)
        );

        const decorForTowerUnit1 = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(110, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 1920, 620)
        );

        const decorForTowerUnit2 = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(130, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 1920, 450)
        );

        let TowerUnitWidget1 = new TowerUnitWidget(
            eventBus,
            new Transform(Vec3.New(200, 300, 2800 * 0.2), 0, scaleVector),
            //x,y,z
            Vec3.New(500, 1920, 620)
        );

        let TowerUnitWidget2 = new TowerUnitWidget(
            eventBus,
            new Transform(Vec3.New(300, 200, 2800 * 0.2), 0, scaleVector),
            //x,y,z
            Vec3.New(600, 1920, 450)
        );

        // Worktops
        const worktopSize: Vec3 = Vec3.New(3000, 40, 600);

        // Worktop Widget African Teak Border
        const africanTeakColour = "#E8A818";
        const worktopWidgetAfrican = new WorktopWidget(
            eventBus,
            new Transform(Vec3.New(400, 0, 1000), 0, scaleVector),
            worktopSize,
            africanTeakColour
        );

        // Worktop Widget Vemeer Border
        const vemeerColour = "#44B84A";
        const worktopWidgetVemeer = new WorktopWidget(
            eventBus,
            new Transform(Vec3.New(1400, 0, 1000), 0, scaleVector),
            worktopSize,
            vemeerColour
        );

        // Work

        // Add widgets to this array
        this.addToWidgets(
            baseUnitWidgetA,
            baseUnitWidgetB,
            wallUnitWidgetA,
            wallUnitWidgetB,
            decorForBaseUnitA,
            decorForBaseUnitB,
            decorForWallUnitA,
            decorForWallUnitB,
            decorForTowerUnit1,
            decorForTowerUnit2,
            TowerUnitWidget1,
            TowerUnitWidget2,
            worktopWidgetAfrican,
            worktopWidgetVemeer
        );
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
