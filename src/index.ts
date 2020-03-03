import { Kitchen } from './Kitchen';
import { MouseEventData, EventBus, MouseDown, MouseMove } from 'engine/EventBus';
import { Vec2 } from 'engine/Vec2';

/**
 * Creates the canvas element and initialises the event listeners for user input.
 */
function createAndInitialiseCanvas(eventBus: EventBus): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const mouseEventData: MouseEventData = {
        position: Vec2.New(0, 0),
    };

    canvas.addEventListener('mousedown', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseEventData.position.x = mouseEvent.clientX - rect.left;
        mouseEventData.position.z = mouseEvent.clientY - rect.top;
        eventBus.publish(MouseDown, mouseEventData);
    });

    canvas.addEventListener('mousemove', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseEventData.position.x = mouseEvent.clientX - rect.left;
        mouseEventData.position.z = mouseEvent.clientY - rect.top;
        eventBus.publish(MouseMove, mouseEventData);
    });

    return canvas;
}

/**
 * Entry point
 */
function main(): void {
    document.body.style.margin = '0';

    const eventBus = new EventBus();
    const canvas = createAndInitialiseCanvas(eventBus);
    const context = canvas.getContext('2d')!;
    //canvas height & width set to full window size until menus added.
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const kitchen = new Kitchen(eventBus);

    const mainLoop = () => {
        context.clearRect(0,0, canvas.width, canvas.height);
        kitchen.update(eventBus);
        kitchen.render(context);
        requestAnimationFrame(mainLoop);
    };

    mainLoop();
}

window.addEventListener('DOMContentLoaded', main);
