import { Mat4 } from "engine/Mat4";

export class Vec3 {
    private data!: Float32Array;
    private constructor() {}

    public static New(x: number, y: number, z: number): Vec3 {
        const vec3 = new Vec3();
        vec3.data = new Float32Array([x, y, z]);
        return vec3;
    }

    public static Zero(): Vec3 {
        return Vec3.New(0.0, 0.0, 0.0);
    }

    public static PositiveOne(): Vec3 {
        return Vec3.New(1.0, 1.0, 1.0);
    }

    public static NegativeOne(): Vec3 {
        return Vec3.New(-1.0, -1.0, -1.0);
    }

    public static PositiveX(): Vec3 {
        return Vec3.New(1.0, 0.0, 0.0);
    }

    public static NegativeX(): Vec3 {
        return Vec3.New(-1.0, 0.0, 0.0);
    }

    public static PositiveY(): Vec3 {
        return Vec3.New(0.0, 1.0, 0.0);
    }

    public static NegativeY(): Vec3 {
        return Vec3.New(0.0, -1.0, 0.0);
    }

    public static PositiveZ(): Vec3 {
        return Vec3.New(0.0, 0.0, 1.0);
    }

    public static NegativeZ(): Vec3 {
        return Vec3.New(0.0, 0.0, -1.0);
    }

    public get x(): number {
        return this.data[0];
    }
    public get y(): number {
        return this.data[1];
    }
    public get z(): number {
        return this.data[2];
    }
    public set x(value: number) {
        this.data[0] = value;
    }
    public set y(value: number) {
        this.data[1] = value;
    }
    public set z(value: number) {
        this.data[2] = value;
    }

    // Extend me with useful methods like dot, normalise, add, etc...
    public subInPlace(other: Vec3): this {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }
    public sub(other: Vec3): Vec3 {
        return this.clone().subInPlace(other);
    }
    public absInPlace(): this {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    public abs(): Vec3 {
        return this.clone().absInPlace();
    }

    public addInPlace(other: Vec3): this {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    public add(other: Vec3): Vec3 {
        return this.clone().addInPlace(other);
    }

    public transformInPlace(matrix: Mat4): this {
        const { x, y, z } = this;
        const w = 1;

        this.x =
            x * matrix.at(0, 0)! +
            y * matrix.at(0, 1)! +
            z * matrix.at(0, 2)! +
            w * matrix.at(0, 3)!;
        this.y =
            x * matrix.at(1, 0)! +
            y * matrix.at(1, 1)! +
            z * matrix.at(1, 2)! +
            w * matrix.at(1, 3)!;
        this.z =
            x * matrix.at(2, 0)! +
            y * matrix.at(2, 1)! +
            z * matrix.at(2, 2)! +
            w * matrix.at(2, 3)!;

        return this;
    }

    public transform(matrix: Mat4): Vec3 {
        return this.clone().transformInPlace(matrix);
    }

    /**
     * Create a new vector with the same values as this.
     */
    public clone(): Vec3 {
        const vec3 = new Vec3();
        vec3.data = new Float32Array(this.data);
        return vec3;
    }
}
