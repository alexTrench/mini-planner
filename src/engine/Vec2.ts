export class Vec2 {
    public static Zero(): Vec2 {
        return new Vec2(0.0, 0.0);
    }

    public static PositiveOne(): Vec2 {
        return new Vec2(1.0, 1.0);
    }

    public static NegativeOne(): Vec2 {
        return new Vec2(-1.0, -1.0);
    }

    public static PositiveX(): Vec2 {
        return new Vec2(1.0, 0.0);
    }

    public static NegativeX(): Vec2 {
        return new Vec2(-1.0, 0.0);
    }

    public static PositiveZ(): Vec2 {
        return new Vec2(0.0, 1.0);
    }

    public static NegativeZ(): Vec2 {
        return new Vec2(0.0, -1.0);
    }

    constructor(
        public x: number,
        public z: number,
    ) {}

    // Extend me with useful methods like dot, normalise, add, etc...

    /**
     * Create a new vector with the same values as this.
     */
    public clone(): Vec2 {
        return new Vec2(this.x, this.z);
    }
}

export interface ReadonlyVec2 {
    readonly x: number;
    readonly z: number;

    clone(): Vec2;
}
