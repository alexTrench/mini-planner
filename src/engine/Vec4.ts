export class Vec4 {
    private data!: Float32Array;
    private constructor() {}

    public static New(x: number, y: number, z: number, w: number): Vec4 {
        const vec4 = new Vec4();
        vec4.data = new Float32Array([x, y, z, w]);
        return vec4;
    }

    public static Zero(): Vec4 {
        return Vec4.New(0.0, 0.0, 0.0, 0.0);
    }

    public static PositiveOne(): Vec4 {
        return Vec4.New(1.0, 1.0, 1.0, 1.0);
    }

    public static NegativeOne(): Vec4 {
        return Vec4.New(-1.0, -1.0, -1.0, -1.0);
    }

    public static PositiveX(): Vec4 {
        return Vec4.New(1.0, 0.0, 0.0, 0.0);
    }

    public static NegativeX(): Vec4 {
        return Vec4.New(-1.0, 0.0, 0.0, 0.0);
    }

    public static PositiveY(): Vec4 {
        return Vec4.New(0.0, 1.0, 0.0, 0.0);
    }

    public static NegativeY(): Vec4 {
        return Vec4.New(0.0, -1.0, 0.0, 0.0);
    }

    public static PositiveZ(): Vec4 {
        return Vec4.New(0.0, 0.0, 1.0, 0.0);
    }

    public static NegativeZ(): Vec4 {
        return Vec4.New(0.0, 0.0, -1.0, 0.0);
    }

    public static PositiveW(): Vec4 {
        return Vec4.New(0.0, 0.0, 0.0, 1.0);
    }

    public static NegativeW(): Vec4 {
        return Vec4.New(0.0, 0.0, 0.0, -1.0);
    }

    public get x(): number { return this.data[0]; }
    public get y(): number { return this.data[1]; }
    public get z(): number { return this.data[2]; }
    public get w(): number { return this.data[3]; }
    public set x(value: number) { this.data[0] = value; }
    public set y(value: number) { this.data[1] = value; }
    public set z(value: number) { this.data[2] = value; }
    public set w(value: number) { this.data[3] = value; }

    /**
     * Create a new vector with the same values as this.
     */
    public clone(): Vec4 {
        const vec4 = new Vec4();
        vec4.data = new Float32Array(this.data);
        return vec4;
    }
}
