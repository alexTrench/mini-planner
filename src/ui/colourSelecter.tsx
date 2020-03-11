import * as React from "react";
import { CirclePicker } from "react-color";
import { EventBus, ChangeColour } from "engine/EventBus";
import { ListItem, ListItemText } from "@material-ui/core";
interface IMenuProps {
    eventBus: EventBus;
}

interface State {
    colour: string;
    selected: boolean;
}

export class ColourManager extends React.Component<IMenuProps, State> {
    constructor(props: any) {
        super(props);
        this.state = { colour: "#fff", selected: false };
    }

    private selectWidget(colour: string): void {
        this.props.eventBus.publish(ChangeColour, colour);
    }

    private handleChangeSelected = () => {
        this.setState({
            colour: this.state.colour,
            selected: !this.state.selected
        });
    };

    private handleChangeComplete = (color: any) => {
        this.setState({ colour: color.hex });
        this.selectWidget(this.state.colour);
    };

    render() {
        if (this.state.selected) {
            return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <ListItem
                        id="colourSelector"
                        onClick={this.handleChangeSelected}
                        button
                    >
                        <ListItemText>Colour</ListItemText>
                    </ListItem>
                    <CirclePicker
                        width={"210px"}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>
            );
        } else {
            return (
                <>
                    <ListItem
                        id="colourSelector"
                        onClick={this.handleChangeSelected}
                        button
                    >
                        <ListItemText>Colour</ListItemText>
                    </ListItem>
                </>
            );
        }
    }
}
