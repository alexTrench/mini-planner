import { Widget } from "widgets/Widget";
import { BaseUnitWidget } from "widgets/BaseUnitWidget";
import { WorktopWidget } from "widgets/WorktopWidget";
import { EventBus } from "engine/EventBus";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { WallUnitWidget } from "widgets/WallUnitWidget";
import { DecorPanelWidget } from "widgets/DecorPanelWidget";
import { TowerUnitWidget } from "widgets/TowerUnitWidget";
import { ItemIdGenerator } from "engine/ItemIdGenerator";

export class Kitchen {
    private itemIdGenerator = new ItemIdGenerator();
    private widgets = new Array<Widget>();
    constructor(eventBus: EventBus) {
        // x: w, y: h, z: d
        const scaleVector = Vec3.New(0.2, 0.2, 0.2);

        //initialise itemIdGenerator
        this.itemIdGenerator.setMaxId(this.widgets);

        // Base Unit Size A
        const baseUnitSizeA = Vec3.New(600, 720, 620);
        const baseUnitWidgetA = new BaseUnitWidget(
            eventBus,
            new Transform(Vec3.New(100, 0, 700 * 0.2), 0, scaleVector),
            baseUnitSizeA,
            this.itemIdGenerator.getUniqueWidgetId()
        );

        // Base Unit Size B
        const baseUnitSizeB = Vec3.New(600, 720, 450);
        const baseUnitWidgetB = new BaseUnitWidget(
            eventBus,
            new Transform(Vec3.New(300, 0, 700 * 0.2), 0, scaleVector),
            baseUnitSizeB,
            this.itemIdGenerator.getUniqueWidgetId()
        );

        //Wall Unit Size A
        const wallUnitSizeA = Vec3.New(600, 720, 400);
        const wallUnitWidgetA = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(400 * 0.2, 0, 50), 0, scaleVector),
            wallUnitSizeA,
            this.itemIdGenerator.getUniqueWidgetId());

        //Wall Unit Size B
        const wallUnitSizeB = Vec3.New(600, 720, 330);
        const wallUnitWidgetB = new WallUnitWidget(
            eventBus,
            new Transform(Vec3.New(1100 * 0.2, 0, 50), 0, scaleVector),
            wallUnitSizeB,
            this.itemIdGenerator.getUniqueWidgetId());

        const decorForBaseUnitA = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(30, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 620),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        const decorForBaseUnitB = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(50, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 430),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        const decorForWallUnitA = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(70, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 400),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        const decorForWallUnitB = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(90, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 720, 330),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        const decorForTowerUnit1 = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(110, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 1920, 620),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        const decorForTowerUnit2 = new DecorPanelWidget(
            eventBus,
            new Transform(
                Vec3.New(130, 0, 2100 * 0.2),
                0,
                Vec3.New(0.2, 0.2, 0.2)
            ),
            //    w: x, h: y, d: z
            Vec3.New(20, 1920, 450),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        let TowerUnitWidget1 = new TowerUnitWidget(
            eventBus,
            new Transform(Vec3.New(200, 300, 2800 * 0.2), 0, scaleVector),
            //x,y,z
            Vec3.New(500, 1920, 620),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        let TowerUnitWidget2 = new TowerUnitWidget(
            eventBus,
            new Transform(Vec3.New(300, 200, 2800 * 0.2), 0, scaleVector),
            //x,y,z
            Vec3.New(600, 1920, 450),
            this.itemIdGenerator.getUniqueWidgetId()
        );

        // Worktops
        const worktopSize: Vec3 = Vec3.New(3000, 40, 600);

        // Worktop Widget African Teak Border
        const africanTeakColour = "#E8A818";
        const worktopWidgetAfrican = new WorktopWidget(
            eventBus,
            new Transform(Vec3.New(400, 0, 1000), 0, scaleVector),
            worktopSize,
            africanTeakColour,
            this.itemIdGenerator.getUniqueWidgetId()
        );

        // Worktop Widget Veneer Border
        const veneerColour = "#44B84A";
        const worktopWidgetVeneer = new WorktopWidget(
            eventBus,
            new Transform(Vec3.New(1400, 0, 1000), 0, scaleVector),
            worktopSize,
            veneerColour,
            this.itemIdGenerator.getUniqueWidgetId()
        );

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
            worktopWidgetVeneer
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
