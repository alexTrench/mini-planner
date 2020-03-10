import * as React from "react";
import {EventBus, NewPlan, SpawnWidget} from "engine/EventBus";
import {WidgetType} from "data/DefaultModelData";
import {Button, AppBar, Toolbar} from "@material-ui/core";
import 'style/Menu.css';


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
                <AppBar id="app-bar" position="sticky">
                <Toolbar>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.BaseUnitA)
                        }
                >
                    Base Unit A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.BaseUnitB)
                        }
                >
                    Base Unit B
                </Button>

                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.WallUnitA)
                        }
                >
                    Wall Unit A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.WallUnitB)
                        }
                >
                    Wall Unit B
                </Button>

                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.TowerUnitA)
                        }
                >
                    Tower Unit A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.TowerUnitB)
                        }
                >
                    Tower Unit B
                </Button>

                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.WorktopA)
                        }
                >
                    Worktop A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.WorktopB)
                        }
                >
                    Worktop B
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorBaseA)
                        }
                >
                    Decor Base Unit A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorBaseB)
                        }
                >
                    Decor Base Unit B
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorWallA)
                        }
                >
                    Decor Wall A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorWallB)
                        }
                >
                    Decor Wall B
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorTowerA)
                        }
                >
                    Decor Tower A
                </Button>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={event =>
                            this.spawnWidget(event, WidgetType.DecorTowerB)
                        }
                >
                    Decor Tower B
                </Button>
                </Toolbar>
                <Toolbar>
                <Button size="small"
                        variant="outlined"
                        color="inherit"
                        id="newPlan" onClick={event => this.newPlan(event)}>
                    New Plan
                </Button>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}
