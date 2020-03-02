import { Widget } from 'widgets/Widget';
import { EventBus } from 'engine/EventBus';

export class Kitchen {
    private widgets = new Array<Widget>();

    constructor(_eventBus: EventBus) {

    }

    public update(eventBus: EventBus): void {
        for (const widget of this.widgets) {
            widget.update(eventBus);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        for (const widget of this.widgets) {
            widget.render(context);
        }
    }
}
