import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import {
    EventBus,
    MouseDown,
    MouseUp,
    IMouseEventData,
    MouseMove
} from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import { AxisAlignedBoundingBox } from "engine/AxisAlignedBoundingBox";
import { IDefaultWidgetInfo } from "engine/IWidgetObject";
import { IModelData } from "data/DefaultModelData";
import {
    createRectanglePolygon,
    transformPolygonInPlace
} from "engine/PolygonHelpers";
import { render2dPolygon } from "engine/RenderHelpers";
import { History, ActionType } from "engine/History";
import { eq } from 'engine/FloatHelpers';

export abstract class Widget {
    public transform: Transform;
    public dimensions: Vec3;

    protected isSelected = false;
    protected isHovered = false;
    protected isDragging = false;
    protected abstract fillColour: string;
    protected abstract borderColour: string;
    protected abstract type: string;
    protected abstract material: string;
    protected mouseDragOffset: Vec2 = Vec2.Zero();
    protected mouseDragStart: Vec2 = Vec2.Zero();
    protected skipSuperMove = false;

    // Maybe add other colours for things?
    boundingBox: AxisAlignedBoundingBox;

    public constructor(
        eventBus: EventBus,
        history: History,
        model: IModelData,
        protected id: number
    ) {
        eventBus.subscribe(MouseDown, this.handleMouseDown.bind(this));
        eventBus.subscribe(MouseUp, e => this.handleMouseUp(e, history));
        eventBus.subscribe(MouseMove, this.handleMouseMove.bind(this));

        const defaultScaleVector = Vec3.New(0.2, 0.2, 0.2);
        const defaultTranslation = Vec3.New(400, 400, 400);
        const defaultRotation = 0;
        const defaultTransform = new Transform(
            defaultTranslation,
            defaultRotation,
            defaultScaleVector
        );

        this.transform = defaultTransform.clone();
        this.dimensions = model.dimensions.clone();

        this.boundingBox = new AxisAlignedBoundingBox(
            this.dimensions.x / 2,
            this.dimensions.y / 2,
            this.dimensions.z / 2,
            new Transform(
                Vec3.New(
                    this.transform.translation.x,
                    this.transform.translation.y,
                    this.transform.translation.z
                ),
                this.transform.rotation,
                Vec3.New(
                    this.transform.scale.x,
                    this.transform.scale.y,
                    this.transform.scale.z
                )
            )
        );
    }

    public getId(): number {
        return this.id;
    }

    public handleMouseDown(mouse: IMouseEventData): void {
        if (this.boundingBox.containsPointInXZ(mouse.position)) {
            const centrePoint = Vec2.New(
                this.transform.translation.x,
                this.transform.translation.z
            );
            this.mouseDragOffset = centrePoint.sub(mouse.position);
            this.mouseDragStart = centrePoint;
            this.isDragging = true;
        }
    }

    public handleMouseUp(mouse: IMouseEventData, history: History): void {
        if (this.boundingBox.containsPointInXZ(mouse.position)) {
            const { x: tx, z: tz } = this.transform.translation;
            const { x: mx, z: mz } = this.mouseDragStart;

            if (this.skipSuperMove) {
                this.skipSuperMove = false;
            } else {
                if (!eq(tx, mx) || !eq(tz, mz)) {
                    history.saveMoveAction(
                        ActionType.Move,
                        this.getId(),
                        {
                            start: Vec2.New(mx, mz),
                            end: Vec2.New(tx, tz)
                        }
                    );
                }
            }
        }
        
        this.isDragging = false;
    }

    public handleMouseMove(mouse: IMouseEventData): void {
        if (this.isDragging) {
            this.setPosition(
                mouse.position.x + this.mouseDragOffset.x,
                this.transform.translation.y,
                mouse.position.z + this.mouseDragOffset.z
            );
        }
    }

    public setDimensions(width: number, height: number, depth: number): void {
        this.dimensions.x = width;
        this.dimensions.y = height;
        this.dimensions.z = depth;
        this.boundingBox.setDimensions(width, height, depth);
    }

    public setPosition(x: number, y: number, z: number): void {
        this.transform.translation.x = x;
        this.transform.translation.y = y;
        this.transform.translation.z = z;
        this.boundingBox.setPosition(x, y, z);
    }

    public setRotationY(y: number): void {
        this.transform.rotation = y;
    }

    public setScale(x: number, y: number, z: number): void {
        this.transform.scale.x = x;
        this.transform.scale.y = y;
        this.transform.scale.z = z;
        this.boundingBox.setScale(x, y, z);
    }

    public abstract update(eventBus: EventBus): void;

    public render(context: CanvasRenderingContext2D): void {
        const { x, z } = this.dimensions;
        const polygon = createRectanglePolygon(x / 2, z / 2);
        const transformMatrix = this.transform.getTransformationMatrix();
        transformPolygonInPlace(polygon, transformMatrix);
        const { fillColour, borderColour } = this;
        render2dPolygon(context, polygon, fillColour, borderColour);

        // temp drawing of bounding box - uncomment below to draw bounding box

        // const polygon2 = createRectanglePolygon(x / 2, z / 2);
        // const transformMatrix2 = this.boundingBox.transform.getTransformationMatrix();
        // transformPolygonInPlace(polygon2, transformMatrix2);
        // render2dPolygon(context, polygon2, "red", "red");
    }

    public toJSON(): IDefaultWidgetInfo {
        const { x: tx, y: ty, z: tz } = this.transform.translation;
        const { x: dx, y: dy, z: dz } = this.dimensions;

        const widgetInfo: IDefaultWidgetInfo = {
            id: this.id,
            position: { x: tx, y: ty, z: tz },
            dimensions: { w: dx, h: dy, d: dz },
            rotation: this.transform.rotation,
            type: this.type,
            material: this.material
        };
        return widgetInfo;
    }

    public hasCollided(box: AxisAlignedBoundingBox): boolean {
        return box.intersectsBoundingBox(this.boundingBox);
    }

    public getBox(): AxisAlignedBoundingBox {
        return this.boundingBox;
    }
}
