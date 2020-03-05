import * as React from "react";
import { EventBus, NewPlan, SpawnWidget } from "engine/EventBus";
import { WidgetType } from "data/DefaultModelData";

interface IMenuProps {
    eventBus: EventBus;
}

export class Menu extends React.Component<IMenuProps> {
    private spawnWidget(event: React.MouseEvent, widgetType: WidgetType): void {
        event.preventDefault();
        this.props.eventBus.publish(SpawnWidget, widgetType);
    }

    private newPlan(event: React.MouseEvent) {
        event.preventDefault();
        this.props.eventBus.publish(NewPlan);
    }

    render() {
        return (
            <div>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.BaseUnitA)
                    }
                >
                    Base Unit A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.BaseUnitB)
                    }
                >
                    Base Unit B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.WallUnitA)
                    }
                >
                    Wall Unit A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.WallUnitB)
                    }
                >
                    Wall Unit B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.TowerUnitA)
                    }
                >
                    Tower Unit A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.TowerUnitB)
                    }
                >
                    Tower Unit B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.WorktopA)
                    }
                >
                    Worktop A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.WorktopB)
                    }
                >
                    Worktop B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorBaseA)
                    }
                >
                    Decor Base Unit A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorBaseB)
                    }
                >
                    Decor Base Unit B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorWallA)
                    }
                >
                    Decor Wall A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorWallB)
                    }
                >
                    Decor Wall B
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorTowerA)
                    }
                >
                    Decor Tower A
                </button>
                <button
                    onClick={event =>
                        this.spawnWidget(event, WidgetType.DecorTowerB)
                    }
                >
                    Decor Tower B
                </button>
                <button id="newPlan" onClick={event => this.newPlan(event)}>
                    New Plan
                </button>
            </div>
        );
    }
}
