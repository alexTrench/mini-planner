import { Mat4 } from "engine/Mat4";

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

    public get x(): number {
        return this.data[0];
    }
    public get z(): number {
        return this.data[1];
    }
    public set x(value: number) {
        this.data[0] = value;
    }
    public set z(value: number) {
        this.data[1] = value;
    }

    // Extend me with useful methods like dot, normalise, add, etc...
    public subInPlace(other: Vec2): this {
        this.x -= other.x;
        this.z -= other.z;
        return this;
    }
    public sub(other: Vec2): Vec2 {
        return this.clone().subInPlace(other);
    }
    public absInPlace(): this {
        this.x = Math.abs(this.x);
        this.z = Math.abs(this.z);
        return this;
    }

    public abs(): Vec2 {
        return this.clone().absInPlace();
    }

    public addInPlace(other: Vec2): this {
        this.x += other.x;
        this.z += other.z;
        return this;
    }

    public add(other: Vec2): Vec2 {
        return this.clone().addInPlace(other);
    }

    public transformInPlace(matrix: Mat4): this {
        const { x, z } = this;
        const w = 1;

        this.x =
            x * matrix.at(0, 0)! +
            // y = 0; gone.
            z * matrix.at(0, 2)! +
            w * matrix.at(0, 3)!;

        this.z =
            x * matrix.at(2, 0)! +
            // y = 0; gone.
            z * matrix.at(2, 2)! +
            w * matrix.at(2, 3)!;

        return this;
    }

    public transform(matrix: Mat4): Vec2 {
        return this.clone().transformInPlace(matrix);
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
