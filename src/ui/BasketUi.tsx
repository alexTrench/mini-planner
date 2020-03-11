import * as React from "react";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import { WidgetType } from "data/ModelData";
import { Basket, IBasketItem } from "engine/Basket";
import { BasketStateUpdated, EventBus } from "engine/EventBus";
import { ColourManager } from "ui/colourSelecter";
import { MaterialSelector } from "ui/MaterialSelector";

interface IBasketProps {
    eventBus: EventBus;
    basket: Basket;
}

function convertWidgetTypeForDisplay(widgetType: WidgetType): string {
    // Strip the last character because it's an 'A' or 'B'.
    const indexOfAorB = widgetType.length - 1;
    const stripped = widgetType.slice(0, indexOfAorB);

    // Add spaces between the words
    return stripped.replace(/(.*[a-z])([A-Z].*)/, "$1 $2");
}

//prettier-ignore
export const BasketUi: React.FunctionComponent<IBasketProps> = (props) => {
    const [basketItems, setBasketItems] =  React.useState([] as IBasketItem[]);

    React.useEffect(() => props.eventBus.subscribe(BasketStateUpdated, setBasketItems), []);

    console.log(basketItems);

    return (
        <div id="basket-drawer">
            <Drawer variant={"permanent"} anchor={"right"}>
                <List style={{width: 230, paddingTop: 0, backgroundColor: "#F1F1F1"}}>
                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5}}>Widget Info</Typography>
                        <ListItem style={{backgroundColor: "#F1F1F1"}} id="widget-info-list">
                            <ColourManager eventBus={props.eventBus} ></ColourManager> 
                        </ListItem>
                        <ListItem style={{backgroundColor: "#F1F1F1"}} id="widget-info-list" >
                            <MaterialSelector eventBus={props.eventBus} ></MaterialSelector> 
                        </ListItem>        
                </List>

                <List style={{paddingTop: 0, backgroundColor: "#F1F1F1", height: innerHeight}}>
                    <Typography style={{color: "white", backgroundColor: '#2bb650', padding: 5, marginBottom: "8px"}}>Kitchen Basket</Typography>

                    {props.basket.getBasketContents().map((item) => (
                        <ListItem style={{paddingBottom: 0, paddingTop:0, backgroundColor: "#F1F1F1" }} id="widget-basket-list" key={item.id}>
                            <ListItemText primary={convertWidgetTypeForDisplay(item.widgetType)}/>
                            <ListItemText style={{textAlign: "right"}}>£{item.price}</ListItemText>
                        </ListItem>
                    ))}
                    <Divider/>
                    <ListItem><Typography>Total: £{props.basket.calculateTotal()}</Typography></ListItem>
                </List>
               
            </Drawer>
        </div>
    );
};
