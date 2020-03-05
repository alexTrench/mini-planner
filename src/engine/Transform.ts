import { Vec3 } from "engine/Vec3";
import { Mat4 } from "engine/Mat4";

export class Transform {
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

        return translation.mulInPlace(rotation.mulInPlace(scale));
    }

    public clone(): Transform {
        return new Transform(
            this.translation.clone(),
            this.rotation,
            this.scale.clone()
        );
    }
}
