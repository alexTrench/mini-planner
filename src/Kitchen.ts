import {IWidgetConstructor, Widget} from "widgets/Widget";
import {EventBus, NewPlan, SpawnFromLocalStore, SpawnWidget} from "engine/EventBus";
import {ItemIdGenerator} from "engine/ItemIdGenerator";
import {IDefaultWidgetInfo, IKitchenInfo} from "engine/IWidgetObject";
import {assert} from "utility/Assert";
import {
    cloneModel,
    // cloneModel,
    createModel,
    createWorktopModel,
    DEFAULT_WIDGET_MODEL_DATA, defaultScaleVector,
    IModelData,
    WidgetType
} from "data/ModelData";
import {Transform} from "./engine/Transform";
import {Vec3} from "./engine/Vec3";
import {WorktopMaterial} from "./data/WorktopMaterialBorderDisplayColour";

export class Kitchen {
    private itemIdGenerator = new ItemIdGenerator();
    private widgets = new Array<Widget>();

    constructor(eventBus: EventBus) {
        eventBus.subscribe(NewPlan, this.newPlan.bind(this));
        eventBus.subscribe(SpawnFromLocalStore, () => this.spawnFromLocalStorage(eventBus));
        eventBus.subscribe(SpawnWidget, type => this.spawnFromMenu(eventBus, type));

        if (this.hasPlanInLocalStorage()) {
            this.spawnFromLocalStorage(eventBus);
            this.itemIdGenerator.setMaxId(this.widgets);
        }
    }

    public update(eventBus: EventBus): void {
        for (const widget of this.widgets) {
            widget.update(eventBus);
            for (const widgetB of this.widgets) {
                if (widget !== widgetB) {
                    widget.hasCollided(widgetB.getBox());
                }
            }
        }
    }
    public addToWidgets(...newWidgets: Widget[]): void {
            this.widgets.push(...newWidgets);
    }

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }

    public hasPlanInLocalStorage(): boolean {
        return Boolean(localStorage.getItem("widgets"));
    }

    public addToLocalStorage(): void {
        localStorage.setItem("widgets", JSON.stringify(this.widgets));
    }

    public clearLocalStorage(): void {
        localStorage.removeItem("widgets");
    }

    public toJSON(): IKitchenInfo {
        const items: IDefaultWidgetInfo[] = [];

        let w = -Infinity;
        let d = -Infinity;
        let h = -Infinity;

        for (const widget of this.widgets) {
            const { transform, dimensions } = widget.model;

            w = Math.max(
                w,
                transform.translation.x + dimensions.x
            );
            h = Math.max(
                h,
                transform.translation.y + dimensions.y
            );
            d = Math.max(
                d,
                transform.translation.z + dimensions.z
            );

            items.push(widget.toJSON());
        }

        return {
            assetUrl: "https://static.wrenkitchens.com/3d-assets-2018-3/webgl/",
            roomDimensions: { w, d, h },
            items
        };
    }

    public newPlan(): void {
        this.widgets = [];
        this.clearLocalStorage();
        this.itemIdGenerator.setMaxId(this.widgets);
    }

    private spawnFromLocalStorage(eventBus: EventBus): void {
        const storedWidgets = JSON.parse(localStorage.getItem("widgets")!) as IDefaultWidgetInfo[];
        for(const widget of storedWidgets) {
            const {
                rotation,
                position,
                dimensions: storedDimensions,
                type,
                id,
                module,
                material
            } = widget;

            const { x, y, z } = position;
            const translation = Vec3.New(x, y, z);
            const transform = Transform.New(translation, rotation, defaultScaleVector);

            const { w, d, h } = storedDimensions;
            const dimensions = Vec3.New(w, h, d);

            let model: IModelData;

            switch (type) {
                case "base unit":
                case "wall unit":
                case "tower unit":
                case "decor panel":
                    model = createModel(module, dimensions, transform, material);
                    break;
                case "worktop":
                    model = createWorktopModel(dimensions, transform, material as WorktopMaterial);
                    break;
                default:
                    throw new Error(`Unknown widget type ${type}`);
            }

            this.spawnWidget(eventBus, model, id);
        }
    }


    private spawnFromMenu(eventBus: EventBus, type: WidgetType): void {
        const model = DEFAULT_WIDGET_MODEL_DATA.get(type);
        assert(model, `No default model for widget type ${type}`);
        const newId = this.itemIdGenerator.getUniqueWidgetId();
        this.spawnWidget(eventBus, cloneModel(model), newId);
        this.clearLocalStorage();
        this.addToLocalStorage();
    }

    private getWidgetConstructor(module: string): IWidgetConstructor {
        const WidgetModule = require(`widgets/${module}`);
        const key = Object.keys(WidgetModule).find(key => key !== "__esModule");
        assert(key, "Key is undefined");
        const WidgetConstructor = WidgetModule[key];
        assert(WidgetConstructor, "WidgetConstructor is undefined");

        return WidgetConstructor;
    }

    private spawnWidget(eventBus: EventBus, model: IModelData, id: number): void {
        const Widget = this.getWidgetConstructor(model.module);
        const widget = new Widget(eventBus, model, id);
        this.addToWidgets(widget);
    }
}
