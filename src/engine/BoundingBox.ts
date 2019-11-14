import { Vec3, ReadonlyVec3 } from 'engine/Vec3';
import { ReadonlyVec2 } from 'engine/Vec2';

export class BoundingBox {
    public constructor(
        public centrePoint: Vec3,
        public halfWidth: number,
        public halfHeight: number,
        public halfDepth: number,
    ) {}

    /**
     * Checks to see if two bounding boxes are intersecting one another.
     * @param box The other bounding box.
     */
    public intersectsBoundingBox(_box: ReadonlyBoundingBox): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains a 2D point in the XZ plane.
     * @param point The 2D point to check.
     */
    public containsPointInXZ(_point: ReadonlyVec2): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains the passed 3D point.
     * @param point The 3D point to check.
     */
    public containsPoint(_point: ReadonlyVec3): boolean {
        // TODO:
        // Implement me.
        return false;
    }
}

export interface ReadonlyBoundingBox {
    readonly centrePoint: ReadonlyVec3;
    readonly halfWidth: number;
    readonly halfHeight: number;
    readonly halfDepth: number;

    intersectsBoundingBox(box: ReadonlyBoundingBox): boolean;
    containsPointInXZ(box: ReadonlyVec2): boolean;
    containsPoint(box: ReadonlyVec3): boolean;
}
