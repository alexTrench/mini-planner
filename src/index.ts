import { Kitchen } from './Kitchen';
import { MouseEventData, eventBus, MouseClick, MouseMove } from 'engine/EventBus';
import { Vec2 } from 'engine/Vec2';

/**
 * Creates the canvas element and initialises the event listeners for user input.
 */
function createAndInitialiseCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const mouseEventData: MouseEventData = {
        position: new Vec2(0, 0),
    };

    canvas.addEventListener('click', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        (mouseEventData.position as Vec2).x = mouseEvent.clientX - rect.left;
        (mouseEventData.position as Vec2).z = mouseEvent.clientY - rect.top;
        eventBus.publish(MouseClick, mouseEventData);
    });

    canvas.addEventListener('mousemove', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        (mouseEventData.position as Vec2).x = mouseEvent.clientX - rect.left;
        (mouseEventData.position as Vec2).z = mouseEvent.clientY - rect.top;
        eventBus.publish(MouseMove, mouseEventData);
    });

    return canvas;
}

/**
 * Entry point
 */
function main(): void {
    document.body.style.margin = '0';

    const canvas = createAndInitialiseCanvas();
    const context = canvas.getContext('2d')!;
    const kitchen = new Kitchen();

    const mainLoop = () => {
        kitchen.update();
        kitchen.render(context);
        requestAnimationFrame(mainLoop);
    };

    mainLoop();
}

window.addEventListener('DOMContentLoaded', main);
