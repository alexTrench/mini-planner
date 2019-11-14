import { Transform, ReadonlyTransform } from 'engine/Transform';
import { BoundingBox, ReadonlyBoundingBox } from 'engine/BoundingBox';
import { ReadonlyVec3, Vec3 } from 'engine/Vec3';
import { eventBus, MouseClick, MouseEventData, MouseMove } from 'engine/EventBus';
// import { ReadonlyVec2 } from 'engine/Vec2';

export abstract class Widget {
    private _bounds: BoundingBox;
    protected isSelected = false;
    protected isHovered = false;

    protected abstract fillColour: string;
    protected abstract borderColour: string;
    // Maybe add other colours for things?

    public constructor(
        private _transform: Transform,
        width: number,
        depth: number,
        height: number,
    ) {
        this._bounds = new BoundingBox(
            // Use a reference to the transform's translation vector so that updating
            // one will update the other.
            _transform.translation,
            width * 0.5,
            height * 0.5,
            depth * 0.5,
        );

        eventBus.subscribe(MouseClick, this.handleMouseClick);
        eventBus.subscribe(MouseMove, this.handleMouseMove);
    }

    public handleMouseClick = (_mouse: MouseEventData) => {
        if (this.isHovered) {
            this.isSelected = true;
        }
    };

    public handleMouseMove = (mouse: MouseEventData) => {
        if (this.bounds.containsPointInXZ(mouse.position)) {
            this.isHovered = true;
        }
    };

    /**
     * Property accessor for the readonly transform of the widget.
     * Mutations should be performed via one of the setter methods.
     */
    public get transform(): ReadonlyTransform {
        return this._transform;
    }

    /**
     * Property accessor for the readonly bounds of the widget.
     * Mutations should be performed via one of the setter methods.
     */
    public get bounds(): ReadonlyBoundingBox {
        return this._bounds;
    }

    public getPosition(): ReadonlyVec3 {
        return this._transform.translation;
    }

    public getTransformedPosition(): Vec3 {
        return this._transform.translation.clone();
    }

    public getDimensions(): ReadonlyVec3 {
        return new Vec3(
            this.bounds.halfWidth * 2.0,
            this.bounds.halfHeight * 2.0,
            this.bounds.halfDepth * 2.0,
        );
    }

    public getTransformedDimensions(): Vec3 {
        const {
            x: sx,
            y: sy,
            z: sz,
        } = this._transform.scale;

        const {
            halfWidth,
            halfHeight,
            halfDepth,
        } = this._bounds;

        return new Vec3(
            (halfWidth * 2.0) * sx,
            (halfHeight * 2.0) * sy,
            (halfDepth * 2.0) * sz,
        );
    }

    /**
     * Updates both the dimensions of the widget at the bounding box.
     */
    public setDimensions(width: number, height: number, depth: number): void {
        this._bounds.halfWidth = width * 0.5;
        this._bounds.halfHeight = height * 0.5;
        this._bounds.halfDepth = depth * 0.5;
    }

    public setPosition(x: number, y: number, z: number): void {
        this._transform.translation.x = x;
        this._transform.translation.y = y;
        this._transform.translation.z = z;
    }

    public setRotatio(x: number, y: number, z: number): void {
        this._transform.rotation.x = x;
        this._transform.rotation.y = y;
        this._transform.rotation.z = z;
    }

    public setScale(x: number, y: number, z: number): void {
        this._transform.scale.x = x;
        this._transform.scale.y = y;
        this._transform.scale.z = z;
    }

    public abstract update(): void;
    public abstract render(context: CanvasRenderingContext2D): void;
}
