import { Vec2, Dimensions } from '../engine';

export class BaseWidget {
    constructor(public dimensions: Dimensions, public position: Vec2) { }

    setPosition(x: number, y: number): void {
        this.position = new Vec2(x, y);
    };
}
