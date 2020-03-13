import { Vec2 } from "engine/Vec2";
import { IKeyboardEventData } from "engine/Keyboard";
import { WidgetType } from "data/ModelData";
import {IBasketItem} from "engine/Basket";

type Listener<Args extends any[] = []> = (...args: Args) => void;
export type UnsubscribeFn = () => void;

// Create symbols for message types and add some overloads to the publish and subscribe methods.
export const MouseDown = Symbol("MouseDown");
export const MouseUp = Symbol("MouseUp");
export const MouseMove = Symbol("MouseMove");
export const KeyPress = Symbol("KeyPress");
export const NewPlan = Symbol("NewPlan");
export const SavePlan = Symbol("SavePlan");
export const SpawnWidget = Symbol("SpawnWidget");
export const DeleteWidget = Symbol("DeleteWidget");
export const SpawnFromLocalStore = Symbol("SpawnFromLocalStore");
export const KeyUp = Symbol("KeyUp");
export const BasketStateUpdated = Symbol("BasketStateUpdated");

// Define some data type for the messages.
export interface IMouseEventData {
    position: Vec2;
}

function createUnsubscribeFn(
    subscriptions: Map<symbol, Set<Listener<any>>>,
    event: symbol,
    fn: Listener<any>
): UnsubscribeFn {
    return () => {
        const listeners = subscriptions.get(event);

        if (listeners) {
            listeners.delete(fn);
            subscriptions.set(event, listeners);
        }
    };
}

export class EventBus {
    private subscriptions = new Map<symbol, Set<Listener<any>>>();

    // Method overloads to get type safety on subscribe method.
    public subscribe(
        event: typeof MouseDown,
        fn: Listener<[IMouseEventData]>
    ): UnsubscribeFn;
    public subscribe(
        event: typeof MouseUp,
        fn: Listener<[IMouseEventData]>
    ): UnsubscribeFn;
    public subscribe(
        event: typeof MouseMove,
        fn: Listener<[IMouseEventData]>
    ): UnsubscribeFn;
    public subscribe(
        event: typeof KeyPress,
        fn: Listener<[IKeyboardEventData]>
    ): UnsubscribeFn;
    public subscribe(event: typeof NewPlan, fn: Listener): UnsubscribeFn;
    public subscribe(event: typeof SavePlan, fn: Listener): UnsubscribeFn;
    public subscribe(event: typeof DeleteWidget, fn: Listener): UnsubscribeFn;
    public subscribe(
        event: typeof SpawnWidget,
        fn: Listener<[WidgetType]>
    ): UnsubscribeFn;
    public subscribe(
        event: typeof KeyUp,
        fn: Listener<[IKeyboardEventData]>
    ): UnsubscribeFn;
    public subscribe(event: typeof SpawnFromLocalStore, fn: Listener<any>) :UnsubscribeFn;
    public subscribe(event: typeof BasketStateUpdated, fn: Listener<[IBasketItem[]]>) :UnsubscribeFn;

    /**
     * Subscribe to an event to be notified when a specific event is emitted.
     * Events that were submitted before this subscription was created will not be received.
     * @param event The event you wish to listen for.
     * @param fn The function to be called when the event is emitted.
     */
    public subscribe(event: symbol, fn: Listener<any>): UnsubscribeFn {
        const listeners = this.subscriptions.get(event) || new Set();

        listeners.add(fn);
        this.subscriptions.set(event, listeners);

        return createUnsubscribeFn(this.subscriptions, event, fn);
    }

    // Method overloads to get type safety on publish method.
    public publish(
        event: typeof MouseDown,
        mouseEventData: IMouseEventData
    ): void;
    public publish(
        event: typeof MouseUp,
        mouseEventData: IMouseEventData
    ): void;
    public publish(
        event: typeof MouseMove,
        mouseEventData: IMouseEventData
    ): void;
    public publish(
        event: typeof KeyPress,
        KeyboardEventData: IKeyboardEventData
    ): void;
    public publish(event: typeof NewPlan): void;
    public publish(event: typeof SavePlan): void;
    public publish(event: typeof DeleteWidget): void;
    public publish(event: typeof SpawnWidget, widgetType: WidgetType): void;
    public publish(event: typeof SpawnFromLocalStore): void;
    public publish(
        event: typeof KeyUp,
        KeyboardEventData: IKeyboardEventData
    ): void;
    public publish(event: typeof BasketStateUpdated, items: IBasketItem[]): void;


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
}
