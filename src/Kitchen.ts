import { Widget } from 'widgets/Widget';
import { BaseUnitWidget } from 'widgets/BaseUnitWidget';
import { Transform } from 'engine/Transform';
import { Vec3 } from 'engine/Vec3';

export class Kitchen {
    private widgets = new Array<Widget>();

    constructor() {
        const unit1 = new BaseUnitWidget(
            new Transform(
                new Vec3(50, 0, 50),
                Vec3.Zero(),
                Vec3.PositiveOne(),
            ),
            80,
            87,
            57,
        );

        const unit2 = new BaseUnitWidget(
            new Transform(
                new Vec3(150, 0, 50),
                Vec3.Zero(),
                Vec3.PositiveOne(),
            ),
            80,
            87,
            57,
        );

        this.widgets.push(unit1);
        this.widgets.push(unit2);
    }

    public update(): void {
        for (const widget of this.widgets) {
            widget.update();
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }
}
