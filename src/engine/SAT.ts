import { Vec2 } from "engine/Vec2";

export interface IProjection {
    readonly min: number;
    readonly max: number;
}

function getAxes(polygon: Vec2[]): Vec2[] {
    const result = new Array<Vec2>(polygon.length);

    for (let i = 0; i < polygon.length; i++) {
        //current vertex
        const p1 = polygon[i];
        //next vertex
        const p2 = polygon[(i + 1) % polygon.length];
        //subtract to get the edge vector
        const edge = p1.sub(p2);

        //get perpendicular vector
        result[i] = edge.perpRight().normaliseInPlace();
    }

    return result;
}

function getProjection(polygon: Vec2[], axis: Vec2): IProjection {
    let min = +Infinity;
    let max = -Infinity;

    for (const point of polygon) {
        const projection = point.dotProduct(axis);

        min = Math.min(projection, min);
        max = Math.max(projection, max);
    }

    return { min, max };
}

export function SAT(polygon: Vec2[], otherPoly: Vec2[]) {
    const nestedAxes = [getAxes(polygon), getAxes(otherPoly)];

    for (const axes of nestedAxes) {
        for (const axis of axes) {
            const projA = getProjection(polygon, axis);
            const projB = getProjection(otherPoly, axis);

            if (projA.max < projB.min && projB.max < projA.min) {
                return false;
            }
        }
    }
    return true;
}
