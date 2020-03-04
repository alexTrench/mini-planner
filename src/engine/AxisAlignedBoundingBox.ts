import { Vec3 } from "engine/Vec3";
import { Vec2 } from "engine/Vec2";

export class AxisAlignedBoundingBox {
    public constructor(
        public centrePoint: Vec3,
        public halfWidth: number,
        public halfHeight: number,
        public halfDepth: number
    ) {}

    /**
     * Checks to see if two bounding boxes are intersecting one another.
     * @param box The other bounding box.
     */
    public intersectsBoundingBox(_box: AxisAlignedBoundingBox): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains a 2D point in the XZ plane.
     * @param point The 2D point to check.
     */
    public containsPointInXZ(_point: Vec2): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains the passed 3D point.
     * @param point The 3D point to check.
     */
    public containsPoint(_point: Vec3): boolean {
        // TODO:
        // Implement me.
        return false;
    }
}
