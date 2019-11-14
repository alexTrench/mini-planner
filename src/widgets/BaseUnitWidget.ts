import { Widget } from 'widgets/Widget';

export class BaseUnitWidget extends Widget {
    protected fillColour = '#2bb673';
    protected borderColour = '#000';

    public update() {

    }

    public render(context: CanvasRenderingContext2D): void {
        // Draw Unit
        const { x, z } = this.getTransformedPosition();
        const { x: width, z: depth } = this.getTransformedDimensions();

        const halfWidth = width * 0.5;
        const halfDepth = depth * 0.5;

        const leftPoint = x - halfWidth;
        const topPoint = z - halfDepth;

        context.fillStyle = this.fillColour;
        context.fillRect(leftPoint, topPoint, width, depth);

        context.strokeStyle = this.borderColour;
        context.strokeRect(leftPoint, topPoint, width, depth);
    }
}
