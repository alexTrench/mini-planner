import * as React from "react";
import { EventBus, ChangeWorktopMaterial } from "engine/EventBus";
import { ListItem, ListItemText } from "@material-ui/core";
import { WorktopMaterial } from "data/WorktopMaterialBorderDisplayColour";

interface IMenuProps {
    eventBus: EventBus;
}

interface State {
    selected: boolean;
}

export class MaterialSelector extends React.Component<IMenuProps, State> {
    constructor(props: any) {
        super(props);
        this.state = { selected: false };
    }

    private handleChangeSelected = () => {
        this.setState({
            selected: !this.state.selected
        });
    };

    public handleMaterialChange(newMaterial: string): void {
        this.props.eventBus.publish(ChangeWorktopMaterial, newMaterial);
    }

    render() {
        if (this.state.selected) {
            return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <ListItem
                        id="materialSelector"
                        onClick={this.handleChangeSelected}
                        button
                    >
                        <ListItemText>Material</ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() =>
                            this.handleMaterialChange(
                                WorktopMaterial.AfricanTeak
                            )
                        }
                    >
                        <ListItemText>
                            {WorktopMaterial.AfricanTeak}
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() =>
                            this.handleMaterialChange(
                                WorktopMaterial.CementNoir
                            )
                        }
                    >
                        <ListItemText>
                            {WorktopMaterial.CementNoir}
                        </ListItemText>
                    </ListItem>
                </div>
            );
        } else {
            return (
                <>
                    <ListItem
                        id="materialSelector"
                        onClick={this.handleChangeSelected}
                        button
                    >
                        <ListItemText>Material</ListItemText>
                    </ListItem>
                </>
            );
        }
    }
}
