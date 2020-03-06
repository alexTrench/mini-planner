import { Widget } from "widgets/Widget";
import {
    EventBus,
    NewPlan,
    SpawnWidget,
    KeyPress,
} from "engine/EventBus";
import { ItemIdGenerator } from "engine/ItemIdGenerator";
import { IDefaultWidgetInfo, IKitchenInfo } from "engine/IWidgetObject";
import { assert } from "utility/Assert";
import { DEFAULT_WIDGET_MODEL_DATA, WidgetType } from "data/DefaultModelData";
import { History, ActionType } from "engine/History";
import { IKeyboardEventData } from 'engine/Keyboard';

export class Kitchen {
    private itemIdGenerator = new ItemIdGenerator();
    private widgets = new Array<Widget>();

    constructor(eventBus: EventBus, history: History) {
        eventBus.subscribe(NewPlan, this.newPlan.bind(this));
        eventBus.subscribe(SpawnWidget, type =>
            this.spawnWidget(eventBus, history, type)
        );
        eventBus.subscribe(KeyPress, e => this.handleKeyPress(e, history));
        this.itemIdGenerator.setMaxId(this.widgets);
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

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }

    public handleKeyPress(keyPress: IKeyboardEventData, history: History): void {
        const { key, ctrl, shift, cmd } = keyPress;

        const undoKeySequence = ((ctrl || cmd) && key === "z");
        if (undoKeySequence) {
            history.undo(this.widgets);
        }

        const redoWindowsKeySequence = (ctrl && key === "y");
        const redoMacOSXKeySequence = (shift && cmd && key === "Z");
        const redoKeySequence = redoWindowsKeySequence || redoMacOSXKeySequence;
        if (redoKeySequence) {
            history.redo(this.widgets);
        }
    }

    public addToWidgets(...newWidgets: Widget[]): void {
        this.widgets.push(...newWidgets);
    }

    public getWidgetById(id: number): Widget | undefined {
        return this.widgets.find(widget => widget.getId() === id);
    }

    public toJSON(): IKitchenInfo {
        const items: IDefaultWidgetInfo[] = [];

        let w = -Infinity;
        let d = -Infinity;
        let h = -Infinity;

        for (const widget of this.widgets) {
            w = Math.max(
                w,
                widget.transform.translation.x + widget.dimensions.x
            );
            h = Math.max(
                h,
                widget.transform.translation.y + widget.dimensions.y
            );
            d = Math.max(
                d,
                widget.transform.translation.z + widget.dimensions.z
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
    }

    private spawnWidget(
        eventBus: EventBus,
        history: History,
        type: WidgetType
    ): void {
        const model = DEFAULT_WIDGET_MODEL_DATA.get(type);
        assert(model, `No default model for widget type ${type}`);

        const WidgetModule = require(`widgets/${model.module}`);

        const key = Object.keys(WidgetModule).find(key => key !== "__esModule");
        assert(key, "Key is undefined");
        const WidgetConstructor = WidgetModule[key];
        assert(WidgetConstructor, "WidgetConstructor is undefined");

        const widgetToAdd = new WidgetConstructor(
            eventBus,
            history,
            model,
            this.itemIdGenerator.getUniqueWidgetId()
        );
        history.saveSpawnAction(ActionType.Spawn, widgetToAdd.id, widgetToAdd);
        this.addToWidgets(widgetToAdd);
    }
}
