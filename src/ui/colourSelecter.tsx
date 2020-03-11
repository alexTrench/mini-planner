import * as React from "react";
import { CirclePicker } from "react-color";
import { EventBus, ChangeColour, SelectWidget } from "engine/EventBus";
import { ListItem, ListItemText } from "@material-ui/core";
import { convertWidgetTypeForDisplay } from "./BasketUi";
import { MaterialSelector } from "ui/MaterialSelector";
import { WidgetType } from "data/ModelData";

interface IMenuProps {
    eventBus: EventBus;
}

interface State {
    colour: string;
    selected: boolean;
    widgetType: string;
}

export class ColourManager extends React.Component<IMenuProps, State> {
    constructor(props: any) {
        super(props);
        this.state = { colour: "#fff", selected: false, widgetType: "" };
    }

    componentDidMount() {
        this.props.eventBus.subscribe(SelectWidget, this.whichWidget);
    }
    private selectWidget(colour: string): void {
        this.props.eventBus.publish(ChangeColour, colour);
    }

    private whichWidget = (widget: WidgetType): void => {
        this.setState({
            colour: this.state.colour,
            selected: !this.state.selected,
            widgetType: convertWidgetTypeForDisplay(widget)
        });
    };

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
        if (this.state.widgetType === "") {
            return <div />;
        } else if (this.state.widgetType !== "Worktop") {
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
            return <MaterialSelector eventBus={this.props.eventBus} />;
        }
    }
}
