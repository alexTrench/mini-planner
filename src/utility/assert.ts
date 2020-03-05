export function assert<T>(
    value?: T | null,
    message?: string
): asserts value is T {
    console.assert(value !== undefined && value !== null, message);
}
