import { Transform } from 'engine/Transform';
import { Vec3 } from 'engine/Vec3';
import { EventBus, MouseDown, MouseEventData, MouseMove } from 'engine/EventBus';

export abstract class Widget {
    protected isSelected = false;
    protected isHovered = false;

    protected abstract fillColour: string;
    protected abstract borderColour: string;
    // Maybe add other colours for things?

    public constructor(
        eventBus: EventBus,
        public transform: Transform,
        public dimensions: Vec3,
    ) {
        eventBus.subscribe(MouseDown, this.handleMouseClick);
        eventBus.subscribe(MouseMove, this.handleMouseMove);
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

    public abstract update(eventBus: EventBus): void;
    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract toJSON(): string;
}
