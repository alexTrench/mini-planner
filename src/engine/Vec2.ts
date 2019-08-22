import { Dimensions } from './Dimensions';

export class Vec2 {
    constructor(public x: number, public y: number) { }
}

export function isIntersecting(positionToCheck: Vec2, objPosition: Vec2, objDimensions: Dimensions): boolean {
    return positionToCheck.y > objPosition.y &&
        positionToCheck.y < objPosition.y + objDimensions.depth &&
        positionToCheck.x > objPosition.x &&
        positionToCheck.x < objPosition.x + objDimensions.width;
}

