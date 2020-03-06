import { Vec2 } from "engine/Vec2";
import { Widget } from "widgets/Widget";

export enum ActionType {
    Spawn,
    Move,
    Resize,
    Rotate
}

interface Vec2StateChange {
    start: Vec2;
    end: Vec2;
}

interface SpawnAction {
    type: ActionType.Spawn;
    id: number;
    widget: Widget;
}

interface MoveAction {
    type: ActionType.Move;
    id: number;
    position: Vec2StateChange;
}

interface ResizeAction {
    type: ActionType.Resize;
    id: number;
    position: Vec2StateChange;
    dimensions: Vec2StateChange;
}

interface RotateAction {
    type: ActionType.Rotate;
    id: number;
    rotation: Vec2StateChange;
}

type Action = SpawnAction | MoveAction | ResizeAction | RotateAction;

export class History {
    private undoStack: Action[] = [];
    private redoStack: Action[] = [];

    saveSpawnAction(type: ActionType.Spawn, id: number, widget: Widget): void {
        this.undoStack.push({ type, id, widget });
        this.redoStack = [];
    }

    // need to check if the widget moved before adding the action
    saveMoveAction(
        type: ActionType.Move,
        id: number,
        position: Vec2StateChange
    ): void {
        this.undoStack.push({ type, id, position });
        this.redoStack = [];
    }

    saveResizeAction(
        type: ActionType.Resize,
        id: number,
        position: Vec2StateChange,
        dimensions: Vec2StateChange
    ) {
        this.undoStack.push({ type, id, position, dimensions });
        this.redoStack = [];
    }

    undo(widgets: Widget[]): void {
        if (this.undoStack.length > 0) {
            const action = this.undoStack.pop()!;

            const matchesActionId = (widget: Widget) =>
                widget.getId() === action.id;

            switch (action.type) {
                case ActionType.Spawn:
                    const widgetIndex = widgets.findIndex(matchesActionId);
                    widgets.splice(widgetIndex, 1);
                    break;
                case ActionType.Move: {
                    const widget = widgets.find(matchesActionId);
                    if (widget) {
                        widget.setPosition(
                            action.position.start.x,
                            widget.model.transform.translation.y,
                            action.position.start.z
                        );
                    }
                    break;
                }
                case ActionType.Resize: {
                    const widget = widgets.find(matchesActionId);
                    if (widget) {
                        // Order of operations matters!
                        widget.setDimensions(
                            action.dimensions.start.x,
                            widget.model.dimensions.y,
                            action.dimensions.start.z
                        );
                        widget.setPosition(
                            action.position.start.x,
                            widget.model.transform.translation.y,
                            action.position.start.z
                        );
                    }
                    break;
                }
            }
            this.redoStack.push(action);
        }
    }

    redo(widgets: Widget[]): void {
        if (this.redoStack.length > 0) {
            const action = this.redoStack.pop()!;

            const matchesActionId = (widget: Widget) =>
                widget.getId() === action.id;

            switch (action.type) {
                case ActionType.Spawn: {
                    widgets.push(action.widget); // re sort the array
                    break;
                }
                case ActionType.Move: {
                    const widget = widgets.find(matchesActionId);
                    if (widget) {
                        widget.setPosition(
                            action.position.end.x,
                            widget.model.transform.translation.y,
                            action.position.end.z
                        );
                    }
                    break;
                }
                case ActionType.Resize: {
                    const widget = widgets.find(matchesActionId);
                    if (widget) {
                        widget.setDimensions(
                            action.dimensions.end.x,
                            widget.model.dimensions.y,
                            action.dimensions.end.z
                        );
                        widget.setPosition(
                            action.position.end.x,
                            widget.model.transform.translation.y,
                            action.position.end.z
                        );
                    }
                    break;
                }
            }
            this.undoStack.push(action);
        }
    }
}
