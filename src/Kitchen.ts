import { Unit } from './widgets/Unit';
import { IRenderable } from './engine';

export class Kitchen {
    public items = new Array<IRenderable>();

    constructor() {
        const unit1 = new Unit(100, 90);

        const unit2 = new Unit(100, 90);
        unit2.setPosition(100, 0);

        this.items.push(unit1);
        this.items.push(unit2);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.items.forEach(a => a.draw(ctx));
    }
}
