export function eq(a: number, b: number, epsilon = Number.EPSILON): boolean {
    return Math.abs(a - b) <= epsilon;
}

export function lt(a: number, b: number, epsilon = Number.EPSILON): boolean {
    return (a - b) > 0 && !eq(a, b, epsilon);
}

export function gt(a: number, b: number, epsilon = Number.EPSILON): boolean {
    return (a - b) < 0 && !eq(a, b, epsilon);
}

export function lte(a: number, b: number, epsilon = Number.EPSILON): boolean {
    return !gt(a, b, epsilon);
}

export function gte(a: number, b: number, epsilon = Number.EPSILON): boolean {
    return !lt(a, b, epsilon);
}