import { Vec3, ReadonlyVec3 } from 'engine/Vec3';

export class Transform {
    public constructor(
        public translation: Vec3,
        public rotation: Vec3,
        public scale: Vec3,
    ) {}
}

export interface ReadonlyTransform {
    readonly translation: ReadonlyVec3;
    readonly rotation: ReadonlyVec3;
    readonly scale: ReadonlyVec3;
}
