import { Kitchen } from "Kitchen";
import {
    IMouseEventData,
    EventBus,
    MouseDown,
    MouseUp,
    MouseMove,
    KeyPress,
    KeyUp
} from "engine/EventBus";
import { Vec2 } from "engine/Vec2";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "ui/Root";
import { History } from 'engine/History'
import { IKeyboardEventData, populateKeyboardData } from 'engine/Keyboard';
import {Basket} from "engine/Basket";

/**
 * Creates the div element for the React components
 */
function createReactDivElement(): HTMLDivElement {
    const ui = document.createElement("div");
    ui.id = "ui";
    document.body.appendChild(ui);
    return ui;
}

/**
 * Creates the canvas element and initialises the event listeners for user input.
 */
function createAndInitialiseCanvas(eventBus: EventBus): HTMLCanvasElement {
    const widthOfBasketDrawer = 230;
    const widthOfMenuDrawer = 230;
    const drawerWidth = widthOfBasketDrawer + widthOfMenuDrawer;
    const canvas = document.createElement("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth - drawerWidth;
    canvas.style.marginLeft = widthOfMenuDrawer + "px";
    document.body.appendChild(canvas);

    const mouseEventData: IMouseEventData = {
        position: Vec2.Zero()
    };

    const keyboardEventData: IKeyboardEventData = {
        key: "",
        ctrl: false,
        alt: false,
        shift: false,
        cmd: false
    };

    const mouseEventHelper = (
        eventType: any,
        mouseEventData: IMouseEventData,
        mouseEvent: MouseEvent
    ) => {
        const rect = canvas.getBoundingClientRect();
        mouseEventData.position.x = mouseEvent.clientX - rect.left;
        mouseEventData.position.z = mouseEvent.clientY - rect.top;
        eventBus.publish(eventType, mouseEventData);
    };

    canvas.addEventListener("mousedown", mouseEvent => {
        mouseEventHelper(MouseDown, mouseEventData, mouseEvent);
    });

    canvas.addEventListener("mouseup", mouseEvent => {
        mouseEventHelper(MouseUp, mouseEventData, mouseEvent);
    });

    canvas.addEventListener("mousemove", mouseEvent => {
        mouseEventHelper(MouseMove, mouseEventData, mouseEvent);
    });

    window.addEventListener("keydown", e => {
        e.preventDefault();
        populateKeyboardData(e, keyboardEventData);
        eventBus.publish(KeyPress, keyboardEventData);
    });

    window.addEventListener("keyup", e => {
        e.preventDefault();
        populateKeyboardData(e, keyboardEventData);
        eventBus.publish(KeyUp, keyboardEventData);
    });

    return canvas;
}

/**
 * Entry point
 */
function main(): void {
    const ui = createReactDivElement();

    document.body.style.margin = "0";
    const history = new History();
    const eventBus = new EventBus();
    const canvas = createAndInitialiseCanvas(eventBus);
    const context = canvas.getContext("2d")!;
    const basket = new Basket();
    const kitchen = new Kitchen(eventBus, history, basket);
    ReactDOM.render(React.createElement(Root, { eventBus, basket }), ui);

    //temporary debugging
    //@ts-ignore
    window.kitchen = kitchen;

    const mainLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        kitchen.update(eventBus);
        kitchen.render(context);
        requestAnimationFrame(mainLoop);
    };

    mainLoop();
}

window.addEventListener("DOMContentLoaded", main);
