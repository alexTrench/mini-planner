import { BaseWidget } from './BaseWidget';
import { EventBus, GameEvent, IRenderable, ISelectable, Vec2, Dimensions, isIntersecting } from '../engine';

export class Unit extends BaseWidget implements IRenderable, ISelectable {

    public isSelected = false;

    private getColour(opacity = 1): string {
        return `rgb(39, 174, 96, ${opacity})`;
    }

    constructor(width: number, depth: number) {
        super(new Dimensions(width, depth), new Vec2(0, 0));

        EventBus.subscribe(GameEvent.MouseClick, (e: any) => (this.isSelected = isIntersecting(new Vec2(e.x as number, e.y as number), this.position, this.dimensions)));
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();

        // Draw unit
        ctx.fillStyle = this.isSelected ? this.getColour(1) : this.getColour(0.7);
        ctx.strokeStyle = this.getColour();
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.depth);
        ctx.strokeRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.depth);

        // Draw handle
        ctx.fillStyle = this.getColour();
        ctx.arc(this.position.x + ((this.dimensions.width / 5) * 4), this.position.y + this.dimensions.depth, 5, 0, Math.PI);
        ctx.fill();

        ctx.stroke();
    }
}
