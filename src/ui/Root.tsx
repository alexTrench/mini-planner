import * as React from "react";
import { Menu } from "ui/Menu";
import { EventBus } from "engine/EventBus";

interface IRootProps {
    eventBus: EventBus;
}

export const Root: React.FunctionComponent<IRootProps> = props => {
    return (
        <div>
            <Menu eventBus={props.eventBus} />
        </div>
    );
};
