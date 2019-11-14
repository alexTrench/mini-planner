import { ReadonlyVec2 } from 'engine/Vec2';

type Listener<Args extends any[] = []> = (...args: Args) => void;
export type UnsubscribeFn = () => void;

// Create symbols for message types and add some overloads to the publish and subscribe methods.
export const MouseClick = Symbol('MouseClick');
export const MouseMove = Symbol('MouseMove');

// Define some data type for the messages.
export interface MouseEventData {
    position: ReadonlyVec2;
}

export class EventBus {
    private subscriptions = new Map<symbol, Listener<any>[]>();

    // Method overloads to get type safety on subscribe method.
    public subscribe(event: typeof MouseClick, fn: Listener<[MouseEventData]>): UnsubscribeFn;
    public subscribe(event: typeof MouseMove, fn: Listener<[MouseEventData]>): UnsubscribeFn;

    /**
     * Subscribe to an event to be notified when a specific event is emitted.
     * Events that were submitted before this subscription was created will not be received.
     * @param event The event you wish to listen for.
     * @param fn The function to be called when the event is emitted.
     */
    public subscribe(event: symbol, fn: Listener<any>): UnsubscribeFn {
        const listeners = this.subscriptions.get(event) || [];
        const index = listeners.length;

        listeners.push(fn);
        this.subscriptions.set(event, listeners);

        return this.createUnsubscribeFn(event, index);
    }

    // Method overloads to get type safety on publish method.
    public publish(event: typeof MouseClick, mouseEventData: MouseEventData): void;
    public publish(event: typeof MouseMove, mouseEventData: MouseEventData): void;

    /**
     * Publish events and trigger the listener functions.
     * @param event The event you to publish.
     * @param data Any data that needs to be emitted with the event.
     */
    public publish(event: symbol, ...data: any[]): void {
        const listeners = this.subscriptions.get(event) || [];

        for (const listener of listeners) {
            // Use requestAnimationFrame to cause the listeners to be executed asynchronously.
            requestAnimationFrame(() => listener(...data));
        }
    }

    private createUnsubscribeFn(event: symbol, index: number): UnsubscribeFn {
        return () => {
            const listeners = this.subscriptions.get(event) || [];
            listeners.splice(index, 1);
            this.subscriptions.set(event, listeners);
        };
    }
}

// The global message bus instance.
export const eventBus = new EventBus();
