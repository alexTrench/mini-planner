import * as React from "react";
import { Menu } from "ui/Menu";
import { EventBus } from "engine/EventBus";
import { Basket } from "engine/Basket";
import { BasketUi } from "ui/BasketUi";

interface IRootProps {
    eventBus: EventBus;
    basket: Basket;
}

export const Root: React.FunctionComponent<IRootProps> = props => {
    const { eventBus, basket } = props;

    return (
        <div>
            <div>
                <Menu eventBus={eventBus} />
                <BasketUi eventBus={eventBus} basket={basket} />
            </div>
        </div>
    );
};
