import { Vec3 } from "engine/Vec3";
import { Vec2 } from "engine/Vec2";
import { Transform } from "engine/Transform";

export class AxisAlignedBoundingBox {
    public constructor(
        public halfWidth: number,
        public halfHeight: number,
        public halfDepth: number,
        public transform: Transform
    ) {}

    /**
     * Checks to see if two bounding boxes are intersecting one another.
     * @param box The other bounding box.
     */
    public intersectsBoundingBox(box: AxisAlignedBoundingBox): boolean {
        const centreDifference = this.transform.translation
            .sub(box.transform.translation)
            .abs();

        const scaleX = this.transform.scale.x;
        const scaleY = this.transform.scale.y;
        const scaleZ = this.transform.scale.z;

        const collidesOnX =
            centreDifference.x <=
            this.halfWidth * scaleX + box.halfWidth * scaleX;
        const collidesOnY =
            centreDifference.y <=
            this.halfHeight * scaleY + box.halfHeight * scaleY;
        const collidesOnZ =
            centreDifference.z <=
            this.halfDepth * scaleZ + box.halfDepth * scaleZ;

        return collidesOnX && collidesOnY && collidesOnZ;
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

    public setDimensions(width: number, height: number, depth: number): void {
        this.halfWidth = width;
        this.halfHeight = height;
        this.halfDepth = depth;
    }

    public setPosition(x: number, y: number, z: number): void {
        this.transform.translation.x = x;
        this.transform.translation.y = y;
        this.transform.translation.z = z;
    }

    public setScale(x: number, y: number, z: number): void {
        this.transform.scale.x = x;
        this.transform.scale.y = y;
        this.transform.scale.z = z;
    }
}
