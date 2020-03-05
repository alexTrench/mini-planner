import { Transform } from "engine/Transform";
import { Vec3 } from "engine/Vec3";
import {
    EventBus,
    MouseDown,
    MouseEventData,
    MouseMove
} from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import { AxisAlignedBoundingBox } from "engine/AxisAlignedBoundingBox";
import { IDefaultWidgetInfo } from "engine/IWidgetObject";
import { IModelData } from "data/DefaultModelData";

export abstract class Widget {
    public transform: Transform;
    public dimensions: Vec3;

    protected isSelected = false;
    protected isHovered = false;
    protected abstract fillColour: string;
    protected abstract borderColour: string;
    protected abstract type: string;
    protected abstract material: string;

    // Maybe add other colours for things?
    boundingBox: AxisAlignedBoundingBox;

    public constructor(
        eventBus: EventBus,
        model: IModelData,
        protected id: number
    ) {
        eventBus.subscribe(MouseDown, this.handleMouseClick.bind(this));
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

    public handleMouseClick(_mouse: MouseEventData): void {}

    public handleMouseMove(_mouse: MouseEventData): void {}

    public setDimensions(width: number, height: number, depth: number): void {
        this.dimensions.x = width;
        this.dimensions.y = height;
        this.dimensions.z = depth;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.transform.translation.x = x;
        this.transform.translation.y = y;
        this.transform.translation.z = z;
    }

    public setRotationY(y: number): void {
        this.transform.rotation = y;
    }

    public setScale(x: number, y: number, z: number): void {
        this.transform.scale.x = x;
        this.transform.scale.y = y;
        this.transform.scale.z = z;
    }
    /*
       To be used in rendering Vec2 widgets
     */
    public renderTwoDimensionPolygon(
        context: CanvasRenderingContext2D,
        fillColour: string,
        borderColour: string
    ) {
        const halfWidth = this.dimensions.x / 2;
        const halfHeight = this.dimensions.z / 2;

        const polygon = [
            Vec2.New(-halfWidth, -halfHeight),
            Vec2.New(halfWidth, -halfHeight),
            Vec2.New(halfWidth, halfHeight),
            Vec2.New(-halfWidth, halfHeight)
        ];

        const transformMatrix = this.transform.getTransformationMatrix();

        for (const point of polygon) {
            point.transformInPlace(transformMatrix);
        }

        context.fillStyle = fillColour;
        context.strokeStyle = borderColour;
        context.beginPath();

        context.moveTo(polygon[0].x, polygon[0].z);

        for (const point of polygon) {
            context.lineTo(point.x, point.z);
        }

        context.closePath();
        context.stroke();
        context.fill();

        // temp drawing of bounding box - uncomment the below to draw bounding boxes

        // const polygon2 = [
        //     Vec2.New(-this.boundingBox.halfWidth, -this.boundingBox.halfDepth),
        //     Vec2.New(this.boundingBox.halfWidth, -this.boundingBox.halfDepth),
        //     Vec2.New(this.boundingBox.halfWidth, this.boundingBox.halfDepth),
        //     Vec2.New(-this.boundingBox.halfWidth, this.boundingBox.halfDepth)
        // ];

        // const transformMatrix2 = this.boundingBox.transform.getTransformationMatrix();

        // for (const point of polygon2) {
        //     point.transformInPlace(transformMatrix2);
        // }

        // context.beginPath();
        // context.moveTo(polygon2[0].x, polygon2[0].z);
        // for (const point of polygon2) {
        //     context.lineTo(point.x, point.z);
        // }
        // context.closePath();
        // context.fillStyle = "red";
        // context.fill();
        // context.strokeStyle = "black";
        // context.stroke();
    }

    public abstract update(eventBus: EventBus): void;
    public abstract render(context: CanvasRenderingContext2D): void;

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
