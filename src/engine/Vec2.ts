export class Vec2 {
    private data!: Float32Array;
    private constructor() {}

    public static New(x: number, z: number): Vec2 {
        const vec2 = new Vec2();
        vec2.data = new Float32Array([x, z]);
        return vec2;
    }

    public static Zero(): Vec2 {
        return Vec2.New(0.0, 0.0);
    }

    public static PositiveOne(): Vec2 {
        return Vec2.New(1.0, 1.0);
    }

    public static NegativeOne(): Vec2 {
        return Vec2.New(-1.0, -1.0);
    }

    public static PositiveX(): Vec2 {
        return Vec2.New(1.0, 0.0);
    }

    public static NegativeX(): Vec2 {
        return Vec2.New(-1.0, 0.0);
    }

    public static PositiveY(): Vec2 {
        return Vec2.New(0.0, 1.0);
    }

    public static NegativeY(): Vec2 {
        return Vec2.New(0.0, -1.0);
    }

    public static PositiveZ(): Vec2 {
        return Vec2.New(0.0, 0.0);
    }

    public static NegativeZ(): Vec2 {
        return Vec2.New(0.0, 0.0);
    }

    public get x(): number { return this.data[0]; }
    public get y(): number { return this.data[1]; }
    public set x(value: number) { this.data[0] = value; }
    public set y(value: number) { this.data[1] = value; }

    // Extend me with useful methods like dot, normalise, add, etc...

    public addInPlace(other: Vec2): this {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    public add(other: Vec2): Vec2 {
        return this.clone().addInPlace(other);
    }

    /**
     * Create a new vector with the same values as this.
     */
    public clone(): Vec2 {
        const vec2 = new Vec2();
        vec2.data = new Float32Array(this.data);
        return vec2;
    }
}
