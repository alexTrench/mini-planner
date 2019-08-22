type SubscriptionFn = (data: object) => void

interface EventSubscription {
    event: GameEvent;
    fn: SubscriptionFn;
}

export enum GameEvent {
    MouseClick,
    MouseMove
}

export namespace EventBus {

    const subscriptions = new Map<symbol, EventSubscription>();

    export function subscribe(event: GameEvent, fn: SubscriptionFn): symbol {
        const id = Symbol();
        subscriptions.set(id,{ event, fn });
        return id;
    }

    export function unsubscribe(id: symbol) {
        subscriptions.delete(id)
    }

    export function publish(event: GameEvent, data: any) {
        [...subscriptions.values()]
            .filter((e: EventSubscription) => e.event === event)
            .forEach((e) => e.fn(data));
    }
}
