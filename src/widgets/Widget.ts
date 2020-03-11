import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import { EventBus, MouseUp, IMouseEventData, MouseMove } from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import { AxisAlignedBoundingBox } from "engine/AxisAlignedBoundingBox";
import { IDefaultWidgetInfo } from "engine/IWidgetObject";
import {
    createRectanglePolygon,
    transformPolygonInPlace
} from "engine/PolygonHelpers";
import { render2dPolygon } from "engine/RenderHelpers";
import { History, ActionType } from "engine/History";
import { eq } from "engine/FloatHelpers";
import { IModelData } from "data/ModelData";
import { WORKTOP_MATERIAL_BORDER_COLOUR } from "data/WorktopMaterialBorderDisplayColour";

export interface IWidgetConstructor {
    new (
        eventBus: EventBus,
        history: History,
        model: IModelData,
        id: number
    ): Widget;
}

export abstract class Widget<Model extends IModelData = IModelData> {
    protected isSelected = false;
    protected isHovered = false;
    protected isDragging = false;
    protected abstract material: string;
    protected mouseDragOffset: Vec2 = Vec2.Zero();
    protected mouseDragStart: Vec2 = Vec2.Zero();
    protected skipSuperMove = false;
    protected abstract fillColour: string;
    protected abstract borderColour: string;
    protected abstract type: string;

    // Maybe add other colours for things?
    boundingBox: AxisAlignedBoundingBox;

    public constructor(
        eventBus: EventBus,
        history: History,
        public model: Model,
        public readonly id: number
    ) {
        eventBus.subscribe(MouseUp, e => this.handleMouseUp(e, history));
        eventBus.subscribe(MouseMove, this.handleMouseMove.bind(this));
        const { transform, dimensions } = model;

        this.boundingBox = new AxisAlignedBoundingBox(
            dimensions.x / 2,
            dimensions.y / 2,
            dimensions.z / 2,
            new Transform(
                Vec3.New(
                    transform.translation.x,
                    transform.translation.y,
                    transform.translation.z
                ),
                transform.rotation,
                Vec3.New(
                    transform.scale.x,
                    transform.scale.y,
                    transform.scale.z
                )
            )
        );
    }

    public getIsSelected(): boolean {
        return this.isSelected;
    }

    public getId(): number {
        return this.id;
    }

    public handleMouseDown(mouse: IMouseEventData): void {
        const { translation } = this.model.transform;
        if (this.boundingBox.containsPointInXZ(mouse.position)) {
            const centrePoint = Vec2.New(translation.x, translation.z);
            this.mouseDragOffset = centrePoint.sub(mouse.position);
            this.mouseDragStart = centrePoint;
            this.isDragging = true;
            this.isSelected = !this.isSelected;
        }
    }

    public handleMouseUp(mouse: IMouseEventData, history: History): void {
        if (this.boundingBox.containsPointInXZ(mouse.position)) {
            const { x: tx, z: tz } = this.model.transform.translation;
            const { x: mx, z: mz } = this.mouseDragStart;

            if (this.skipSuperMove) {
                this.skipSuperMove = false;
            } else {
                if (!eq(tx, mx) || !eq(tz, mz)) {
                    history.saveMoveAction(ActionType.Move, this.getId(), {
                        start: Vec2.New(mx, mz),
                        end: Vec2.New(tx, tz)
                    });
                }
            }
        }
        this.isDragging = false;
    }

    public handleMouseMove(mouse: IMouseEventData): void {
        if (this.isDragging) {
            this.setPosition(
                mouse.position.x + this.mouseDragOffset.x,
                this.model.transform.translation.y,
                mouse.position.z + this.mouseDragOffset.z
            );
            this.boundingBox.setPosition(
                mouse.position.x + this.mouseDragOffset.x,
                this.model.transform.translation.y,
                mouse.position.z + this.mouseDragOffset.z
            );
        }
    }

    public getType() {
        return this.type;
    }

    public setDimensions(width: number, height: number, depth: number): void {
        const { dimensions } = this.model;
        dimensions.x = width;
        dimensions.y = height;
        dimensions.z = depth;
        this.boundingBox.setDimensions(width, height, depth);
    }

    public setPosition(x: number, y: number, z: number): void {
        const { translation } = this.model.transform;
        translation.x = x;
        translation.y = y;
        translation.z = z;
        this.boundingBox.setPosition(x, y, z);
    }

    public setRotationY(y: number): void {
        this.model.transform.rotation = y;
    }

    public setScale(x: number, y: number, z: number): void {
        const { transform } = this.model;
        transform.scale.x = x;
        transform.scale.y = y;
        transform.scale.z = z;
    }

    public abstract update(eventBus: EventBus): void;

    public render(context: CanvasRenderingContext2D): void {
        const { x, z } = this.model.dimensions;
        const polygon = createRectanglePolygon(x / 2, z / 2);
        const transformMatrix = this.model.transform.getTransformationMatrix();
        transformPolygonInPlace(polygon, transformMatrix);
        const { fillColour, borderColour } = this;

        //testing purposes only
        if (this.isSelected) {
            render2dPolygon(context, polygon, fillColour, borderColour, 5);
        } else {
            render2dPolygon(context, polygon, fillColour, borderColour, 1);
        }

        // temp drawing of bounding box - uncomment below to draw bounding box

        // const polygon2 = createRectanglePolygon(x / 2, z / 2);
        // const transformMatrix2 = this.boundingBox.transform.getTransformationMatrix();
        // transformPolygonInPlace(polygon2, transformMatrix2);
        // render2dPolygon(context, polygon2, "red", "red");
        //this.setBoundingBoxRotation(context);
    }

    public toJSON(): IDefaultWidgetInfo {
        const { type, id, model } = this;
        const { transform, dimensions, module } = model;

        const { x: tx, y: ty, z: tz } = transform.translation;
        const { x: dx, y: dy, z: dz } = dimensions;

        const widgetInfo: IDefaultWidgetInfo = {
            id,
            module,
            position: { x: tx, y: ty, z: tz },
            dimensions: { w: dx, h: dy, d: dz },
            rotation: transform.rotation,
            type,
            material: this.model.material,
            widgetType: this.model.widgetType
        };
        return widgetInfo;
    }

    public getBox(): AxisAlignedBoundingBox {
        return this.boundingBox;
    }

    public setIsSelected(bool: boolean) {
        this.isSelected = bool;
    }
    public getPoly(): Vec2[] {
        const { x, z } = this.model.dimensions;
        const polygon = createRectanglePolygon(x / 2, z / 2);

        return polygon;
        ///for when rotations is back in
        //testing purposes
    }
    public setBoundingBoxRotation(context: CanvasRenderingContext2D) {
        const { x, z } = this.model.dimensions;
        const polygon = createRectanglePolygon(x / 2, z / 2);
        const transformMatrix = this.model.transform.getTransformationMatrix();
        transformPolygonInPlace(polygon, transformMatrix);

        let minX = Infinity;
        let minZ = Infinity;

        let maxX = -Infinity;
        let maxZ = -Infinity;

        for (let point of polygon) {
            minX = Math.min(point.x, minX);
            minZ = Math.min(point.z, minZ);

            maxX = Math.max(point.x, maxX);
            maxZ = Math.max(point.z, maxZ);
        }

        let newBoundingBox = [];
        let topLeft = Vec2.New(minX, minZ);
        let bottoLeft = Vec2.New(minX, maxZ);
        let bottomRight = Vec2.New(maxX, maxZ);
        let topRight = Vec2.New(maxX, minZ);

        newBoundingBox.push(topLeft);
        newBoundingBox.push(bottoLeft);
        newBoundingBox.push(bottomRight);
        newBoundingBox.push(topRight);

        render2dPolygon(context, newBoundingBox, "black", "black", 1);
    }

    public setMaterial(newMaterial: string) {
        this.model.material = newMaterial;
        //testing purposes only
        this.borderColour = newMaterial;
    }

    public setWorktopMaterial(newMaterial: string) {
        this.model.material = newMaterial;
        this.borderColour = WORKTOP_MATERIAL_BORDER_COLOUR.get(newMaterial)!;
    }
}
