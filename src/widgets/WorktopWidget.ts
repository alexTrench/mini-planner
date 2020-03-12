import { Widget } from "widgets/Widget";
import { IWorktopWidgetInfo } from "engine/IWidgetObject";
import { WORKTOP_MATERIAL_BORDER_COLOUR } from "data/WorktopMaterialBorderDisplayColour";
import { IWorktopModelData } from "data/DefaultModelData";
import { EventBus, MouseEventData } from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import { AxisAlignedBoundingBox } from "engine/AxisAlignedBoundingBox";
import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import {
    createRectanglePolygon,
    transformPolygonInPlace
} from "engine/PolygonHelpers";
import { render2dPolygon } from "engine/RenderHelpers";

export class WorktopWidget extends Widget {
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
    private minSize: number = 50;
    private scale: number = 5;

    constructor(eventBus: EventBus, model: IWorktopModelData, id: number) {
        super(eventBus, model, id);
        this.material = model.material;
        this.id = id;
        this.borderColour = this.material;
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(
            this.material
        )!.borderColour;

        //prettier-ignore
        const { x: transformX, y: transformY, z: transformZ } = this.transform.translation;
        const { x: dimensionX, z: dimensionZ } = this.dimensions;
        const { x: scaleX, z: scaleY } = this.transform.scale;

        this.topBoundingBox = this.createHandleBoundingBox(
            transformX,
            transformY,
            transformZ - (dimensionZ / 2) * scaleY
        );

        this.rightBoundingBox = this.createHandleBoundingBox(
            transformX + (dimensionX / 2) * scaleX,
            transformY,
            transformZ
        );

        this.leftBoundingBox = this.createHandleBoundingBox(
            transformX - (dimensionX / 2) * scaleX,
            transformY,
            transformZ
        );

        this.bottomBoundingBox = this.createHandleBoundingBox(
            transformX,
            transformY,
            transformZ + (dimensionZ / 2) * scaleY
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

    public toJSON(): IWorktopWidgetInfo {
        const widgetInfo = super.toJSON() as IWorktopWidgetInfo;

        const { x, z } = this.dimensions.divScalar(2);

        widgetInfo.points = [
            { x: -x, z: -z },
            { x, z: -z },
            { x, z },
            { x: -x, z }
        ];
        return widgetInfo;
    }

    public handleMouseDown(mouse: MouseEventData): void {
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

    public handleMouseUp(mouse: MouseEventData): void {
        super.handleMouseUp(mouse);
        //left side box
        this.checkLeft(mouse);
        //right side box
        this.checkRight(mouse);
        //top of the box
        this.checkTop(mouse);
        //bottom of the box
        this.checkBottom(mouse);
    }

    public handleMouseMove(mouse: MouseEventData): void {
        this.newPoint = mouse.position.x;
        this.newPointY = mouse.position.z;
        //combines all the potential drag events into one tidy function
        this.drag(mouse);
        if (this.isDragging) {
            this.setPosition(
                mouse.position.x + this.mouseDragOffset.x,
                this.transform.translation.y,
                mouse.position.z + this.mouseDragOffset.z
            );
        }
    }

    private checkLeft(mouse: MouseEventData): void {
        if (this.leftBoundingBox.containsPointInXZ(mouse.position)) {
            this.leftBoxSelected = !this.leftBoxSelected;
            this.isSelected = true;
        } else {
            this.leftBoxSelected = false;
        }
    }

    private checkRight(mouse: MouseEventData) {
        if (this.rightBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.rightBoxSelected = !this.rightBoxSelected;
        } else {
            this.rightBoxSelected = false;
        }
    }

    private checkTop(mouse: MouseEventData) {
        if (this.topBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.topBoxSelected = !this.topBoxSelected;
        } else {
            this.topBoxSelected = false;
        }
    }

    private checkBottom(mouse: MouseEventData) {
        if (this.bottomBoundingBox.containsPointInXZ(mouse.position)) {
            this.isSelected = true;
            this.bottomBoxSelected = !this.bottomBoxSelected;
        } else {
            this.bottomBoxSelected = false;
        }
    }

    private drag(mouse: MouseEventData) {
        const { x: transformX, z: transformZ } = this.transform.translation;
        const { x: dimensionsX, z: dimensionsZ } = this.dimensions;
        const { x: scaleX, z: scaleZ } = this.transform.scale;
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

    private dragLeft(newPoint: number, mouse: MouseEventData) {
        const { y: ty, z: tz } = this.transform.translation;
        const { y: dy, z: dz } = this.dimensions;
        const { x: sx } = this.transform.scale;

        const dx = Math.floor((this.rightPoint - newPoint) * this.scale);

        if (dx >= this.minSize && dx <= this.maxSize) {
            this.setDimensions(dx, dy, dz);

            const tx = mouse.position.x + (dx / 2) * sx;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragRight(newPoint: number, mouse: MouseEventData) {
        const { y: ty, z: tz } = this.transform.translation;
        const { y: dy, z: dz } = this.dimensions;
        const { x: sx } = this.transform.scale;

        const dx = Math.floor((newPoint - this.leftPoint) * this.scale);
        if (dx >= this.minSize && dx <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tx = mouse.position.x - (dx / 2) * sx;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragUp(newPoint: number, mouse: MouseEventData) {
        const { x: tx, y: ty } = this.transform.translation;
        const { x: dx, y: dy } = this.dimensions;
        const { z: sz } = this.transform.scale;

        const dz = Math.floor((this.bottomPoint - newPoint) * this.scale);

        if (dz >= this.minSize && dz <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tz = mouse.position.z + (dz / 2) * sz;
            this.setPosition(tx, ty, tz);
        }
    }

    private dragDown(newPoint: number, mouse: MouseEventData) {
        const { x: tx, y: ty } = this.transform.translation;
        const { x: dx, y: dy } = this.dimensions;
        const { z: sz } = this.transform.scale;

        const dz = Math.floor((newPoint - this.topPoint) * this.scale);
        if (dz >= this.minSize && dz <= this.maxSize) {
            this.setDimensions(dx, dy, dz);
            const tz = mouse.position.z - (dz / 2) * sz;
            this.setPosition(tx, ty, tz);
        }
    }

    private movement(mouse: MouseEventData) {
        //makes sure you cannot move the box while resizing
        if (
            !this.leftBoxSelected &&
            !this.topBoxSelected &&
            !this.bottomBoxSelected &&
            !this.rightBoxSelected
        ) {
            if (this.boundingBox.containsPointInXZ(mouse.position)) {
                const centrePoint = Vec2.New(
                    this.transform.translation.x,
                    this.transform.translation.z
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
                this.transform.rotation,
                Vec3.New(
                    this.transform.scale.x,
                    this.transform.scale.y,
                    this.transform.scale.z
                )
            )
        );
        return newBox;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.transform.translation.x = x;
        this.transform.translation.y = y;
        this.transform.translation.z = z;

        this.boundingBox.setPosition(x, y, z);
        this.topBoundingBox.setPosition(
            x,
            y,
            z - (this.dimensions.z / 2) * this.transform.scale.z
        );
        this.rightBoundingBox.setPosition(
            x + (this.dimensions.x / 2) * this.transform.scale.x,
            y,
            z
        );
        this.leftBoundingBox.setPosition(
            x - (this.dimensions.x / 2) * this.transform.scale.x,
            y,
            z
        );
        this.bottomBoundingBox.setPosition(
            x,
            y,
            z + (this.dimensions.z / 2) * this.transform.scale.z
        );
    }
}
