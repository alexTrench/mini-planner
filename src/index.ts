import { Kitchen } from './Kitchen';
import { EventBus, GameEvent } from './engine';

function sizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.style.width = canvas.width + 'px';
    canvas.height = window.innerHeight;
    canvas.style.height = canvas.height + 'px'
};

function createCanvas (): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);
    sizeCanvas(canvas);
    canvas.style.margin = '0';

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        EventBus.publish(GameEvent.MouseClick, { x, y });
    });

    return canvas;
};

function init(): void {
    document.body.style.margin = '0';
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');
    const kitchen = new Kitchen();
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        kitchen.draw(ctx);
        window.requestAnimationFrame(draw);
    };
    draw();
};

window.addEventListener('DOMContentLoaded', () => init());
window.addEventListener('resize', (e: Event) => sizeCanvas(e.target as HTMLCanvasElement));
