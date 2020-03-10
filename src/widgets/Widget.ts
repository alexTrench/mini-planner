import {Transform} from "engine/Transform";
import {Vec3} from "engine/Vec3";
import {
    EventBus,
    MouseDown,
    MouseUp,
    MouseEventData,
    MouseMove
} from "engine/EventBus";
import {Vec2} from "engine/Vec2";
import {AxisAlignedBoundingBox} from "engine/AxisAlignedBoundingBox";
import {IDefaultWidgetInfo} from "engine/IWidgetObject";
import {IModelData} from "data/ModelData";


export interface IWidgetConstructor {
    new(eventBus: EventBus, model: IModelData, id: number): Widget;
}

export abstract class Widget<Model extends IModelData = IModelData> {
    protected isSelected = false;
    protected isHovered = false;
    protected isDragging = false;
    private mouseDragOffset: Vec2 = Vec2.New(0, 0);
    protected abstract readonly fillColour: string;
    protected abstract readonly borderColour: string;
    protected abstract type: string;

    // Maybe add other colours for things?
    boundingBox: AxisAlignedBoundingBox;

    public constructor(
        eventBus: EventBus,
        public model: Model,
        public readonly id: number,
    ) {
        eventBus.subscribe(MouseDown, this.handleMouseDown.bind(this));
        eventBus.subscribe(MouseUp, this.handleMouseUp.bind(this));
        eventBus.subscribe(MouseMove, this.handleMouseMove.bind(this));

        const {transform, dimensions} = model;

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

    public getId(): number {
        return this.id;
    }

    public handleMouseDown(mouse: MouseEventData): void {
        if (this.boundingBox.containsPointInXZ(mouse.position)) {
            const centrePoint = Vec2.New(
                this.model.transform.translation.x,
                this.model.transform.translation.z
            );
            this.mouseDragOffset = centrePoint.sub(mouse.position);
            this.isDragging = true;
        }
    }

    public handleMouseUp(_mouse: MouseEventData): void {

        this.isDragging = false;
    }

    public handleMouseMove(mouse: MouseEventData): void {
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

    public setDimensions(width: number, height: number, depth: number): void {
        const { dimensions } = this.model;
        dimensions.x = width;
        dimensions.y = height;
        dimensions.z = depth;
    }

    public setPosition(x: number, y: number, z: number): void {
        const { transform } = this.model;
        transform.translation.x = x;
        transform.translation.y = y;
        transform.translation.z = z;
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

    /*
       To be used in rendering Vec2 widgets
     */
    public renderTwoDimensionPolygon(
        context: CanvasRenderingContext2D,
        fillColour: string,
        borderColour: string
    ) {
        const { transform, dimensions } = this.model;

        const halfWidth = dimensions.x / 2;
        const halfHeight = dimensions.z / 2;

        const polygon = [
            Vec2.New(-halfWidth, -halfHeight),
            Vec2.New(halfWidth, -halfHeight),
            Vec2.New(halfWidth, halfHeight),
            Vec2.New(-halfWidth, halfHeight)
        ];

        const transformMatrix = transform.getTransformationMatrix();

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
        const { type, id, model } = this;
        const { transform, dimensions, material, module } = model;

        const {x: tx, y: ty, z: tz} = transform.translation;
        const {x: dx, y: dy, z: dz} = dimensions;

        const widgetInfo: IDefaultWidgetInfo = {
            id,
            module,
            position: {x: tx, y: ty, z: tz},
            dimensions: {w: dx, h: dy, d: dz},
            rotation: transform.rotation,
            type,
            material,
        };

        return widgetInfo;
    }

    public hasCollided(box: AxisAlignedBoundingBox) {
        let isCollided = box.intersectsBoundingBox(this.boundingBox);
        isCollided ? console.log(isCollided) : null;
    }

    public getBox(): AxisAlignedBoundingBox {
        return this.boundingBox;
    }
}
