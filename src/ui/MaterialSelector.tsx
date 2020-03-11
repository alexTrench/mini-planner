import * as React from "react";
import { EventBus, ChangeWorktopMaterial } from "engine/EventBus";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { WorktopMaterial } from "data/WorktopMaterialBorderDisplayColour";

interface IMenuProps {
    eventBus: EventBus;
}

interface State {
    selected: boolean;
}

export class MaterialSelector extends React.Component<IMenuProps, State> {
    constructor(props: IMenuProps) {
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

    // public worktopTypes = Object.keys(WorktopMaterial).map(
    //     (worktopType: number | string) => (
    //         <ListItem
    //             button
    //             onClick={() =>
    //                 this.handleMaterialChange(WorktopMaterial[worktopType])
    //             }
    //         >
    //             <ListItemText>{WorktopMaterial[worktopType]}</ListItemText>
    //         </ListItem>
    //     )
    // );

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
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
                        this.handleMaterialChange(WorktopMaterial.AfricanTeak)
                    }
                >
                    <ListItemText inset>
                        <Typography style={{ fontSize: "12px" }}>
                            {WorktopMaterial.AfricanTeak}
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem
                    button
                    onClick={() =>
                        this.handleMaterialChange(WorktopMaterial.CementNoir)
                    }
                >
                    <ListItemText inset>
                        <Typography style={{ fontSize: "12px" }}>
                            {WorktopMaterial.CementNoir}
                        </Typography>
                    </ListItemText>
                </ListItem>
            </div>
        );
    }
}
