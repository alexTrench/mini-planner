export class Vec3 {
    public static Zero(): Vec3 {
        return new Vec3(0.0, 0.0, 0.0);
    }

    public static PositiveOne(): Vec3 {
        return new Vec3(1.0, 1.0, 1.0);
    }

    public static NegativeOne(): Vec3 {
        return new Vec3(-1.0, -1.0, -1.0);
    }

    public static PositiveX(): Vec3 {
        return new Vec3(1.0, 0.0, 0.0);
    }

    public static NegativeX(): Vec3 {
        return new Vec3(-1.0, 0.0, 0.0);
    }

    public static PositiveY(): Vec3 {
        return new Vec3(0.0, 1.0, 0.0);
    }

    public static NegativeY(): Vec3 {
        return new Vec3(0.0, -1.0, 0.0);
    }

    public static PositiveZ(): Vec3 {
        return new Vec3(0.0, 0.0, 1.0);
    }

    public static NegativeZ(): Vec3 {
        return new Vec3(0.0, 0.0, -1.0);
    }

    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    // Extend me with useful methods like dot, normalise, add, etc...

    public addInPlace(other: Vec3): this {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    /**
     * Create a new vector with the same values as this.
     */
    public clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }
}

export interface ReadonlyVec3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    clone(): Vec3;
}
