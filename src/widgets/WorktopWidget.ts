import { Widget } from "widgets/Widget";
import { IWorktopWidgetInfo } from "engine/IWidgetObject";
import { WORKTOP_MATERIAL_BORDER_COLOUR } from "data/WorktopMaterialBorderDisplayColour";
import { EventBus, IMouseEventData } from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import { AxisAlignedBoundingBox } from "engine/AxisAlignedBoundingBox";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import {
    createRectanglePolygon,
    transformPolygonInPlace
} from "engine/PolygonHelpers";
import { render2dPolygon } from "engine/RenderHelpers";
import { History, ActionType } from "engine/History";
import { eq } from 'engine/FloatHelpers';
import { IWorktopModelData } from "data/ModelData";

export class WorktopWidget extends Widget<IWorktopModelData> {
    public borderColour: string;
    public fillColour: string = "#F0F0F0";
    type: string = "worktop";
    public material: string;
    private newPoint: number = 0;
    private newPointY: number = 0;
    private rightPoint: number = 0;
    private leftPoint: number = 0;
    private bottomPoint: number = 0;
    private topPoint: number = 0;

    private topBoundingBox: AxisAlignedBoundingBox;
    private rightBoundingBox: AxisAlignedBoundingBox;
    private leftBoundingBox: AxisAlignedBoundingBox;
    private bottomBoundingBox: AxisAlignedBoundingBox;
    private allBoundingBoxes: Array<AxisAlignedBoundingBox>;
    private resizingWidgetSize: number = 40;
    private leftBoxSelected: boolean = false;
    private rightBoxSelected: boolean = false;
    private topBoxSelected: boolean = false;
    private bottomBoxSelected: boolean = false;
    private maxSize: number = 5000;
    private minSize: number = 200;
    private scale: number = 5;
    private previousDimension: Vec2 = Vec2.Zero();

    constructor(
        eventBus: EventBus,
        history: History,
        model: IWorktopModelData,
        id: number
    ) {
        super(eventBus, history, model, id);
        this.material = model.material;
        this.borderColour = this.material;
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(model.material)!;

        //prettier-ignore
        const { x: transformX, y: transformY, z: transformZ } = this.model.transform.translation;
        const { x: dimensionX, z: dimensionZ } = this.model.dimensions;
        const { x: scaleX, z: scaleY } = this.model.transform.scale;

        this.topBoundingBox = this.createHandleBoundingBox(
            transformX,
            transformY,
            transformZ - (dimensionZ / 2 - this.resizingWidgetSize) * scaleY
        );

        this.rightBoundingBox = this.createHandleBoundingBox(
            transformX + (dimensionX / 2 - this.resizingWidgetSize) * scaleX,
            transformY,
            transformZ
        );

        this.leftBoundingBox = this.createHandleBoundingBox(
            transformX - (dimensionX / 2 - this.resizingWidgetSize) * scaleX,
            transformY,
            transformZ
        );

        this.bottomBoundingBox = this.createHandleBoundingBox(
            transformX,
            transformY,
            transformZ + (dimensionZ / 2 - this.resizingWidgetSize) * scaleY
        );

        this.allBoundingBoxes = [];
        this.allBoundingBoxes.push(this.topBoundingBox);
        this.allBoundingBoxes.push(this.rightBoundingBox);
        this.allBoundingBoxes.push(this.leftBoundingBox);
        this.allBoundingBoxes.push(this.bottomBoundingBox);
    }
    public update() {}

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);

        if (this.isSelected) {
            for (const box of this.allBoundingBoxes) {
                const polygon = createRectanglePolygon(
                    box.halfWidth,
                    box.halfDepth
                );
                const transformMatrix = box.transform.getTransformationMatrix();
                transformPolygonInPlace(polygon, transformMatrix);
                const fillColour = "rgb(0, 255, 0, 0.2)";
                const borderColour = "green";
                render2dPolygon(context, polygon, fillColour, borderColour);
            }
        }
    }

    public getMaterial() {
        return this.material;
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

        return widgetInfo;
    }

    public handleMouseDown(mouse: IMouseEventData): void {
        const centrePoint = Vec2.New(
            this.model.transform.translation.x,
            this.model.transform.translation.z
        );
        this.mouseDragStart = centrePoint;
        this.previousDimension = Vec2.New(this.model.dimensions.x, this.model.dimensions.z);
        //left side box
        this.checkLeft(mouse);
        //right side box
        this.checkRight(mouse);
        //top of the box
        this.checkTop(mouse);
        //bottom of the box
        this.checkBottom(mouse);
        //moves the mouse
        this.movement(mouse);
    }

    public handleMouseUp(mouse: IMouseEventData, history: History): void {
        //left side box
        this.checkLeft(mouse);
        //right side box
        this.checkRight(mouse);
        //top of the box
        this.checkTop(mouse);
        //bottom of the box
        this.checkBottom(mouse);

        const { x: dx, z: dz } = this.model.dimensions;
        const { x: px, z: pz } = this.previousDimension;

        if(!eq(dx, px) || !eq(dz, pz)) {
            const { x: tx, z: tz } = this.model.transform.translation;
            const { x: mx, z: mz } = this.mouseDragStart;

            history.saveResizeAction(
                ActionType.Resize,
                this.getId(),
                {
                    start: Vec2.New(mx, mz),
                    end: Vec2.New(tx, tz)
                },
                {
                    start: Vec2.New(px, pz),
                    end: Vec2.New(dx, dz)
                }
            );

            this.skipSuperMove = true;
        }

        super.handleMouseUp(mouse, history);
    }

    public handleMouseMove(mouse: IMouseEventData): void {
        this.newPoint = mouse.position.x;
        this.newPointY = mouse.position.z;
        //combines all the potential drag events into one tidy function
        this.drag(mouse);
        super.handleMouseMove(mouse);
    }

    private checkLeft(mouse: IMouseEventData): void {
        if (this.leftBoundingBox.containsPointInXZ(mouse.position)) {
            this.leftBoxSelected = !this.leftBoxSelected;
            this.isSelected = true;
        } else {
            this.leftBoxSelected = false;
        }
    }

    private checkRight(mouse: IMouseEventData) {
        if (this.rightBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.rightBoxSelected = !this.rightBoxSelected;
        } else {
            this.rightBoxSelected = false;
        }
    }

    private checkTop(mouse: IMouseEventData) {
        if (this.topBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.topBoxSelected = !this.topBoxSelected;
        } else {
            this.topBoxSelected = false;
        }
    }

    private checkBottom(mouse: IMouseEventData) {
        if (this.bottomBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.bottomBoxSelected = !this.bottomBoxSelected;
        } else {
            this.bottomBoxSelected = false;
        }
    }

    private drag(mouse: IMouseEventData) {
        const { x: transformX, z: transformZ } = this.model.transform.translation;
        const { x: dimensionsX, z: dimensionsZ } = this.model.dimensions;
        const { x: scaleX, z: scaleZ } = this.model.transform.scale;
        //left of the box
        if (this.leftBoxSelected) {
            this.dragLeft(this.newPoint, mouse);
        } else {
            this.rightPoint = transformX + (dimensionsX / 2) * scaleX;
        }

        //right of the box
        if (this.rightBoxSelected) {
            this.dragRight(this.newPoint, mouse);
        } else {
            this.leftPoint = transformX - (dimensionsX / 2) * scaleX;
        }

        //top of the box
        if (this.topBoxSelected) {
            this.dragUp(this.newPointY, mouse);
        } else {
            this.bottomPoint = transformZ + (dimensionsZ / 2) * scaleZ;
        }

        //bottom of the box
        if (this.bottomBoxSelected) {
            this.dragDown(this.newPointY, mouse);
        } else {
            this.topPoint = transformZ - (dimensionsZ / 2) * scaleZ;
        }
    }

    private dragLeft(newPoint: number, mouse: IMouseEventData) {
        const { y: ty, z: tz } = this.model.transform.translation;
        const { y: dy, z: dz } = this.model.dimensions;
        const { x: sx } = this.model.transform.scale;

        const dx = Math.floor((this.rightPoint - newPoint) * this.scale);

        if (dx >= this.minSize && dx <= this.maxSize) {
            this.setDimensions(dx, dy, dz);

            const tx = mouse.position.x + (dx / 2) * sx;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragRight(newPoint: number, mouse: IMouseEventData) {
        const { y: ty, z: tz } = this.model.transform.translation;
        const { y: dy, z: dz } = this.model.dimensions;
        const { x: sx } = this.model.transform.scale;

        const dx = Math.floor((newPoint - this.leftPoint) * this.scale);
        if (dx >= this.minSize && dx <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tx = mouse.position.x - (dx / 2) * sx;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragUp(newPoint: number, mouse: IMouseEventData) {
        const { x: tx, y: ty } = this.model.transform.translation;
        const { x: dx, y: dy } = this.model.dimensions;
        const { z: sz } = this.model.transform.scale;

        const dz = Math.floor((this.bottomPoint - newPoint) * this.scale);

        if (dz >= this.minSize && dz <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tz = mouse.position.z + (dz / 2) * sz;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragDown(newPoint: number, mouse: IMouseEventData) {
        const { x: tx, y: ty } = this.model.transform.translation;
        const { x: dx, y: dy } = this.model.dimensions;
        const { z: sz } = this.model.transform.scale;

        const dz = Math.floor((newPoint - this.topPoint) * this.scale);
        if (dz >= this.minSize && dz <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tz = mouse.position.z - (dz / 2) * sz;
            this.setPosition(tx, ty, tz);
        }
    }

    private movement(mouse: IMouseEventData) {
        //makes sure you cannot move the box while resizing
        if (
            !this.leftBoxSelected &&
            !this.topBoxSelected &&
            !this.bottomBoxSelected &&
            !this.rightBoxSelected
        ) {
           super.handleMouseDown(mouse)

            if (this.boundingBox.containsPointInXZ(mouse.position)) {
                const centrePoint = Vec2.New(
                    this.model.transform.translation.x,
                    this.model.transform.translation.z
                );
                this.mouseDragOffset = centrePoint.sub(mouse.position);
                this.isDragging = true;
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }
        }
    }

    private createHandleBoundingBox(
        translationX: number,
        translationY: number,
        translationZ: number
    ): AxisAlignedBoundingBox {
        const newBox = new AxisAlignedBoundingBox(
            this.resizingWidgetSize,
            this.resizingWidgetSize,
            this.resizingWidgetSize,
            new Transform(
                Vec3.New(translationX, translationY, translationZ),
                this.model.transform.rotation,
                Vec3.New(
                    this.model.transform.scale.x,
                    this.model.transform.scale.y,
                    this.model.transform.scale.z
                )
            )
        );
        return newBox;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.model.transform.translation.x = x;
        this.model.transform.translation.y = y;
        this.model.transform.translation.z = z;

        this.boundingBox.setPosition(x, y, z);
        this.topBoundingBox.setPosition(
            x,
            y,
            z - (this.model.dimensions.z / 2  - this.resizingWidgetSize) * this.model.transform.scale.z
        );
        this.rightBoundingBox.setPosition(
            x + (this.model.dimensions.x / 2 - this.resizingWidgetSize) * this.model.transform.scale.x,
            y,
            z
        );
        this.leftBoundingBox.setPosition(
            x - (this.model.dimensions.x / 2 - this.resizingWidgetSize) * this.model.transform.scale.x,
            y,
            z
        );
        this.bottomBoundingBox.setPosition(
            x,
            y,
            z + (this.model.dimensions.z / 2 - this.resizingWidgetSize) * this.model.transform.scale.z
        );
    }
}
