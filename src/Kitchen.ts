import { Basket } from "engine/Basket";
import { ItemIdGenerator } from "engine/ItemIdGenerator";
import { IDefaultWidgetInfo, IKitchenInfo } from "engine/IWidgetObject";
import { History, ActionType } from "engine/History";
import { IKeyboardEventData } from "engine/Keyboard";
import {
    EventBus,
    MouseUp,
    MouseDown,
    NewPlan,
    SavePlan,
    KeyPress,
    SpawnFromLocalStore,
    SpawnWidget,
    DeleteWidget,
    IMouseEventData,
    KeyUp,
    Rotate,
    ChangeColour,
    ChangeWorktopMaterial,
    SelectWidget
} from "engine/EventBus";
import { assert } from "utility/Assert";
import { IWidgetConstructor, Widget } from "widgets/Widget";
import {
    cloneModel,
    createModel,
    createWorktopModel,
    DEFAULT_WIDGET_MODEL_DATA,
    defaultScaleVector,
    IModelData,
    WidgetType
} from "data/ModelData";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { WorktopMaterial } from "data/WorktopMaterialBorderDisplayColour";
import { SAT } from "engine/SAT";
import { WorktopWidget } from "widgets/WorktopWidget";

export class Kitchen {
    private itemIdGenerator = new ItemIdGenerator();
    private widgets = new Array<Widget>();
    private planName?: string;
    private shiftPressed: boolean = false;

    constructor(eventBus: EventBus, history: History, private basket: Basket) {
        eventBus.subscribe(SavePlan, this.savePlan.bind(this));
        eventBus.subscribe(DeleteWidget, this.deleteWidget.bind(this));
        eventBus.subscribe(KeyPress, e => this.handleKeyPress(e, history));
        eventBus.subscribe(KeyUp, e => this.handleKeyUp(e));
        eventBus.subscribe(MouseDown, e => this.widgetDragStart(e, eventBus));
        eventBus.subscribe(ChangeColour, colour => this.changeColour(colour));
        eventBus.subscribe(ChangeWorktopMaterial, colour =>
            this.changeWorktopMaterial(colour)
        );
        eventBus.subscribe(NewPlan, this.newPlan);

        this.itemIdGenerator.setMaxId(this.widgets);
        eventBus.subscribe(SpawnFromLocalStore, () =>
            this.spawnFromLocalStorage(eventBus, history)
        );
        eventBus.subscribe(SpawnWidget, type =>
            this.spawnFromMenu(eventBus, type, history)
        );
        eventBus.subscribe(MouseUp, () => this.addToLocalStorage());
        eventBus.subscribe(MouseUp, () => this.updateBasket(eventBus));
        eventBus.subscribe(Rotate, () => this.rotate());
        this.itemIdGenerator.setMaxId(this.widgets);

        if (this.hasPlanInLocalStorage()) {
            this.spawnFromLocalStorage(eventBus, history);
            this.itemIdGenerator.setMaxId(this.widgets);
        }
    }

    public rotate() {
        var increaseInRotation = -30 * (Math.PI / 180);
        this.widgets[0].setRotationY(
            this.widgets[0].model.transform.rotation + increaseInRotation
        );
    }

    public update(eventBus: EventBus): void {
        for (const widget of this.widgets) {
            widget.update(eventBus);
            const polygon = widget.getPoly();

            for (const widgetB of this.widgets) {
                if (widget !== widgetB) {
                    const polygonB = widgetB.getPoly();
                    let hasCollided = SAT(polygon, polygonB);

                    console.log(hasCollided);
                }
            }
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }

    public widgetDragStart(mouse: IMouseEventData, event: EventBus): void {
        const hoveredWidgets = [];

        for (const widget of this.widgets) {
            if (widget.boundingBox.containsPointInXZ(mouse.position)) {
                hoveredWidgets.push(widget);
            }
            if (!this.shiftPressed) {
                widget.setIsSelected(false);
            }
        }
        const highestWidget = hoveredWidgets.pop()!;

        if (highestWidget) {
            highestWidget.handleMouseDown(mouse);
        }

        this.selectWidget(event);
    }

    public handleKeyUp(keyPress: IKeyboardEventData): void {
        console.log(keyPress);
        if (keyPress.key === "Shift") {
            this.shiftPressed = false;
        }
    }

    public handleKeyPress(
        keyPress: IKeyboardEventData,
        history: History
    ): void {
        const { key, ctrl, shift, cmd } = keyPress;

        const undoKeySequence = (ctrl || cmd) && key === "z";
        if (undoKeySequence) {
            history.undo(this.widgets);
        }

        const redoWindowsKeySequence = ctrl && key === "y";
        const redoMacOSXKeySequence = shift && cmd && key === "Z";
        const redoKeySequence = redoWindowsKeySequence || redoMacOSXKeySequence;
        if (redoKeySequence) {
            history.redo(this.widgets);
        }

        if (shift) {
            this.shiftPressed = true;
        }
    }

    public hasPlanInLocalStorage(): boolean {
        return Boolean(localStorage.getItem("widgets"));
    }

    public clearLocalStorage(): void {
        localStorage.removeItem("widgets");
    }

    public addToLocalStorage(): void {
        localStorage.setItem("widgets", JSON.stringify(this.widgets));
    }

    public toJSON(): IKitchenInfo {
        const items: IDefaultWidgetInfo[] = [];

        let w = -Infinity;
        let d = -Infinity;
        let h = -Infinity;

        for (const widget of this.widgets) {
            const { transform, dimensions } = widget.model;

            w = Math.max(w, transform.translation.x + dimensions.x);
            h = Math.max(h, transform.translation.y + dimensions.y);
            d = Math.max(d, transform.translation.z + dimensions.z);

            items.push(widget.toJSON());
        }

        return {
            planName: this.planName!,
            assetUrl: "https://static.wrenkitchens.com/3d-assets-2018-3/webgl/",
            roomDimensions: { w, d, h },
            items
        };
    }

    public newPlan = async () => {
        this.widgets = [];
        this.itemIdGenerator.setMaxId(this.widgets);
        this.planName = prompt("Please name your kitchen ", "Custom Kitchen")!;

        this.clearLocalStorage();
        this.itemIdGenerator.setMaxId(this.widgets);
    };

    protected updateBasket(eventBus: EventBus) {
        this.basket.updateBasketFromKitchen(this.widgets, eventBus);
    }

    public selectWidget(event: EventBus) {
        let amountSelected = 0;
        for (let widget of this.widgets) {
            if (widget.getIsSelected()) {
                event.publish(SelectWidget, widget.model.widgetType);
                amountSelected++;
            }
        }

        if (amountSelected === 0) {
            event.publish(SelectWidget, "" as WidgetType);
        }
    }

    private spawnFromLocalStorage(eventBus: EventBus, history: History): void {
        this.widgets = [];
        const storedWidgets = JSON.parse(
            localStorage.getItem("widgets")!
        ) as IDefaultWidgetInfo[];

        for (const widget of storedWidgets) {
            const {
                rotation,
                position,
                dimensions: storedDimensions,
                type,
                id,
                module,
                material,
                widgetType
            } = widget;

            const { x, y, z } = position;
            const translation = Vec3.New(x, y, z);
            const transform = Transform.New(
                translation,
                rotation,
                defaultScaleVector
            );

            const { w, d, h } = storedDimensions;
            const dimensions = Vec3.New(w, h, d);

            let model: IModelData;

            switch (type) {
                case "base unit":
                case "wall unit":
                case "tower unit":
                case "decor panel":
                    model = createModel(
                        module,
                        dimensions,
                        transform,
                        material,
                        widgetType
                    );
                    break;
                case "worktop":
                    model = createWorktopModel(
                        dimensions,
                        transform,
                        material as WorktopMaterial,
                        widgetType
                    );
                    break;
                default:
                    throw new Error(`Unknown widget type ${type}`);
            }
            this.spawnWidget(eventBus, model, id, history);
        }
    }

    private spawnFromMenu(
        eventBus: EventBus,
        type: WidgetType,
        history: History
    ): void {
        const model = DEFAULT_WIDGET_MODEL_DATA.get(type);
        assert(model, `No default model for widget type ${type}`);
        const newId = this.itemIdGenerator.getUniqueWidgetId();
        this.spawnWidget(eventBus, cloneModel(model), newId, history);
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

    private spawnWidget(
        eventBus: EventBus,
        model: IModelData,
        id: number,
        history: History
    ): void {
        const Widget = this.getWidgetConstructor(model.module);
        const widget = new Widget(eventBus, history, model, id);
        history.saveSpawnAction(ActionType.Spawn, widget.getId(), widget);

        this.widgets.push(widget);
        this.widgets.sort(
            (a, b): any =>
                a.model.transform.translation.y -
                b.model.transform.translation.y
        );
        this.updateBasket(eventBus);
    }

    public savePlan = async () => {
        if (!this.planName) {
            this.planName = prompt(
                "Please name your kitchen ",
                "Custom Kitchen"
            )!;
        }
        const http = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(this)
        };
        console.log(http);
        await fetch("http://localhost:9001/save-kitchen", http);
    };

    public deleteWidget(): void {
        const tempWidgets = [...this.widgets];
        tempWidgets.sort((a, b) => {
            if (a.getIsSelected() && !b.getIsSelected()) {
                return -1;
            } else if (!a.getIsSelected() && b.getIsSelected()) {
                return 1;
            } else {
                return 0;
            }
        });

        let selectMaxWidgetFound = false;
        let maxSelectedIndex = -Infinity;

        for (let i = 0; i < tempWidgets.length; i += 1) {
            const widget = tempWidgets[i];
            if (!widget.getIsSelected()) {
                break;
            }

            selectMaxWidgetFound = true;
            maxSelectedIndex = Math.max(maxSelectedIndex, i);
        }

        if (selectMaxWidgetFound) {
            const splicedWidgets = tempWidgets.splice(0, maxSelectedIndex + 1);

            for (const widget of splicedWidgets) {
                const widgetId = widget.getId();
                this.itemIdGenerator.releaseId(widgetId);
            }

            this.widgets = tempWidgets;
        }
        this.addToLocalStorage();
    }

    public changeColour(newColour: string): void {
        for (const widget of this.widgets) {
            if (widget.getIsSelected() && !(widget instanceof WorktopWidget)) {
                widget.setMaterial(newColour);
            }
        }
    }

    public changeWorktopMaterial(newMaterial: string): void {
        for (const widget of this.widgets) {
            if (widget.getIsSelected() && widget instanceof WorktopWidget) {
                widget.setWorktopMaterial(newMaterial);
            }
        }
    }
}
