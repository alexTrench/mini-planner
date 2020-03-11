import { Vec3 } from "engine/Vec3";
import { Mat4 } from "engine/Mat4";

export class Transform {
    public static New(
        translation: Vec3,
        rotation: number,
        scale: Vec3
    ): Transform {
        return new Transform(translation, rotation, scale);
    }

    // TODO:
    // Make this private to keep consistency with the vector and matrix classes.
    public constructor(
        public translation: Vec3,
        public rotation: number,
        public scale: Vec3
    ) {}

    public getTransformationMatrix(): Mat4 {
        const { x: tx, y: ty, z: tz } = this.translation;
        const { x: sx, y: sy, z: sz } = this.scale;
        const translation = Mat4.Translation(tx, ty, tz);
        const rotation = Mat4.RotationY(this.rotation);
        const scale = Mat4.Scale(sx, sy, sz);

        return rotation.mulInPlace(scale).mulInPlace(translation); 

    }

    public clone(): Transform {
        return new Transform(
            this.translation.clone(),
            this.rotation,
            this.scale.clone()
        );
    }
}
