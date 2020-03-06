import { Mat4 } from "engine/Mat4";

export class Vec3 {
    private data!: Float32Array;

    private constructor() {
    }

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

    // Extend me with useful methods like dot, normalise, etc...
    public dotProduct(other: Vec3): number {
        const x = other.x * this.x;
        const y = other.y * this.y;
        const z = other.z * this.z;

        return x + y + z;
    }

    public getMagnitude(): number {
        return Math.sqrt(this.dotProduct(this));
    }

    public normaliseInPlace(): this {
        const magnitude = this.getMagnitude();

        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;

        return this;
    }

    public normalise(): Vec3 {
        return this.clone().normaliseInPlace();
    }

    //testing, not sure if this is right
    //void for now but will return a new vec3 eventually
    public crossProduct(other: Vec3): Vec3 {
        let newX = this.y * other.z - this.z * other.y;
        let newY = this.z * other.x - this.x * other.z;
        let newZ = this.x * other.y - this.y * other.x;
        return Vec3.New(newX, newY, newZ);
    }

    // Extend me with useful methods like dot, normalise, add, etc...
    public subInPlace(other: IReadonlyVec3): this {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    public sub(other: IReadonlyVec3): Vec3 {
        return this.clone().subInPlace(other);
    }

    public addInPlace(other: IReadonlyVec3): this {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    public add(other: IReadonlyVec3): Vec3 {
        return this.clone().addInPlace(other);
    }

    public mul(other: IReadonlyVec3): Vec3 {
        return this.clone().mulInPlace(other);
    }

    public mulInPlace(other: IReadonlyVec3): this {
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        return this;
    }

    public div(other: IReadonlyVec3): Vec3 {
        return this.clone().divInPlace(other);
    }

    public divInPlace(other: IReadonlyVec3): this {
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;
        return this;
    }

    public subScalarInPlace(other: number): this {
        this.x -= other;
        this.y -= other;
        this.z -= other;
        return this;
    }

    public subScalar(other: number): Vec3 {
        return this.clone().subScalarInPlace(other);
    }

    public addScalarInPlace(other: number): this {
        this.x += other;
        this.y += other;
        this.z += other;
        return this;
    }

    public addScalar(other: number): Vec3 {
        return this.clone().addScalarInPlace(other);
    }

    public mulScalar(other: number): Vec3 {
        return this.clone().mulScalarInPlace(other);
    }

    public mulScalarInPlace(other: number): this {
        this.x *= other;
        this.y *= other;
        this.z *= other;
        return this;
    }

    public divScalar(other: number): Vec3 {
        return this.clone().divScalarInPlace(other);
    }

    public divScalarInPlace(other: number): this {
        this.x /= other;
        this.y /= other;
        this.z /= other;
        return this;
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

    public transformInPlace(matrix: Mat4): this {
        const {x, y, z} = this;
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

export interface IReadonlyVec3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    sub(other: Vec3): Vec3;

    add(other: Vec3): Vec3

    mul(other: Vec3): Vec3;

    div(other: Vec3): Vec3;

    subScalar(other: number): Vec3;

    addScalar(other: number): Vec3;

    mulScalar(other: number): Vec3;

    divScalar(other: number): Vec3;

    abs(): Vec3;

    transform(matrix: Mat4): Vec3;

    clone(): Vec3;
}
