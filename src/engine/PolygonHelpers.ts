import { Vec2 } from "engine/Vec2";
import { Mat4 } from "engine/Mat4";

export function createRectanglePolygon(
    halfWidth: number,
    halfHeight: number
): Vec2[] {
    return [
        Vec2.New(-halfWidth, -halfHeight),
        Vec2.New(halfWidth, -halfHeight),
        Vec2.New(halfWidth, halfHeight),
        Vec2.New(-halfWidth, halfHeight)
    ];
}

export function transformPolygonInPlace(
    polygon: Vec2[],
    transformMatrix: Mat4
): void {
    for (const point of polygon) {
        point.transformInPlace(transformMatrix);
    }
}
