//prettier-ignore
export class Mat4 {
    public static WIDTH = 4;

    private data!: Float32Array;
    private constructor() {}

    public at(x: number, y: number): number | undefined {
        return this.data[x + y * Mat4.WIDTH];
    }

    public static Identity(): Mat4 {
        const mat4 = new Mat4();

        mat4.data = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);

        return mat4;
    }

    public static Translation(x: number, y: number, z: number): Mat4 {
        const mat4 = new Mat4();

        mat4.data = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            x  , y  , z  , 1.0,
        ]);

        return mat4;
    }

    public static RotationY(y: number): Mat4 {
        const mat4 = new Mat4();
        const cy = Math.cos(y);
        const sy = Math.sin(y);

        mat4.data = new Float32Array([
            cy , 0.0, -sy, 0.0,
            0.0, 1.0, 0.0, 0.0,
            sy , 0.0, cy , 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);

        return mat4;
    }

    public static Scale(x: number, y: number, z: number): Mat4 {
        const mat4 = new Mat4();

        mat4.data = new Float32Array([
            x  , 0.0, 0.0, 0.0,
            0.0, y  , 0.0, 0.0,
            0.0, 0.0, z  , 0.0,
            1.0, 1.0, 1.0, 1.0,
        ]);

        return mat4;
    }

    public mulInPlace(other: Mat4): this {
        const aData = this.data;
        const bData = other.data;
        const W = Mat4.WIDTH;

        for (let y = 0; y < W; y += 1) {
            for (let x = 0; x < W; x += 1) {
                const index = x + y * W;

                aData[index] = aData[x + 0 * W] * bData[0 + y * W]
                             + aData[x + 1 * W] * bData[1 + y * W]
                             + aData[x + 2 * W] * bData[2 + y * W]
                             + aData[x + 3 * W] * bData[3 + y * W];
            }
        }

        return this;
    }

    public mul(other: Mat4): Mat4 {
        return this.clone().mulInPlace(other);
    }

    public clone(): Mat4 {
        const mat4 = new Mat4();
        mat4.data = new Float32Array(this.data);
        return mat4;
    }
}
