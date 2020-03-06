import { Vec2 } from "engine/Vec2";

export function render2dPolygon(
    context: CanvasRenderingContext2D,
    polygon: Vec2[],
    fillColour: string,
    borderColour: string
): void {
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
}
