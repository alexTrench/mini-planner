import * as React from "react";
import {EventBus, NewPlan, SavePlan, SpawnWidget, DeleteWidget, SpawnFromLocalStore} from "engine/EventBus";
import {WidgetType} from "data/ModelData";
import {List, ListItem, ListItemText, Drawer, Typography} from "@material-ui/core";

interface IMenuProps {
    eventBus: EventBus;
}

function spawnWidget(event: React.MouseEvent, eventBus: EventBus, widgetType: WidgetType): void {
    event.preventDefault();
    eventBus.publish(SpawnWidget, widgetType);
}

function newPlan(event: React.MouseEvent, eventBus: EventBus): void {
    event.preventDefault();
    eventBus.publish(NewPlan);
}

function deleteWidget(event: React.MouseEvent, eventBus: EventBus): void {
    event.preventDefault();
    eventBus.publish(DeleteWidget);
}

function savePlan(event: React.MouseEvent, eventBus: EventBus): void {
    event.preventDefault();
    eventBus.publish(SavePlan);
}

function spawnFromLocalStore(event: React.MouseEvent, eventBus: EventBus): void {
    event.preventDefault();
    eventBus.publish(SpawnFromLocalStore)
}

export const Menu: React.FunctionComponent<IMenuProps> = (props) => {
    const {eventBus} = props;


    return (
        <div id="menu-drawer">
            <Drawer anchor={"left"} variant={"permanent"}>
                <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Menu</Typography>
                <List style={{width: 230, paddingTop: 0, height: innerHeight, backgroundColor: "#F1F1F1"}}>
                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                              onClick={event => newPlan(event, eventBus)}>
                        <ListItemText>
                            New Plan
                        </ListItemText>
                    </ListItem>

                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                              onClick={event => savePlan(event, eventBus)}>
                        <ListItemText>
                            Save Plan
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                              onClick={event => deleteWidget(event, eventBus)}>
                        <ListItemText>
                            Delete
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                              onClick={event => spawnFromLocalStore(event, eventBus)}>
                        <ListItemText>
                            Load From Cache
                        </ListItemText>
                    </ListItem>

                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Base Units</Typography>
                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.BaseUnitA)}>
                        <ListItemText>
                            Base Unit A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "#F1F1F1"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.BaseUnitB)}>
                        <ListItemText>
                            Base Unit B
                        </ListItemText>
                    </ListItem>

                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Wall Units</Typography>

                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.WallUnitA)}>
                        <ListItemText>
                            Wall Unit A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.WallUnitB)}>
                       <ListItemText>
                           Wall Unit B
                       </ListItemText>
                    </ListItem>

                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Tower Units</Typography>

                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.TowerUnitA)}>
                        <ListItemText>
                            Tower Unit A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.TowerUnitB)}>
                        <ListItemText>
                            Tower Unit B
                        </ListItemText>
                    </ListItem>

                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Worktops</Typography>

                    <ListItem button
                              style={{backgroundColor:"inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.WorktopA)}>
                        <ListItemText>
                        Worktop A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.WorktopB)}>
                        <ListItemText>
                            Worktop B
                        </ListItemText>
                    </ListItem>

                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Decors</Typography>

                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorBaseA)}>
                        <ListItemText>
                            Decor Base A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorBaseB)}>
                        <ListItemText>
                            Decor Base B
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorWallA)}>
                        <ListItemText>
                            Decor Wall A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorWallB)}>
                        <ListItemText>
                            Decor Wall B
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorTowerA)}>
                        <ListItemText>
                            Decor Tower A
                        </ListItemText>
                    </ListItem>
                    <ListItem button
                              style={{backgroundColor: "inherit"}}
                            onClick={event => spawnWidget(event, eventBus, WidgetType.DecorTowerB)}>
                        <ListItemText>
                            Decor Tower B
                        </ListItemText>
                    </ListItem>

                </List>
            </Drawer>
        </div>
    )
};
