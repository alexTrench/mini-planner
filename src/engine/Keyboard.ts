export enum KeyCode {
    Shift = 16,
    Ctrl = 17,   
    Y = 89,
    Z = 90,
    ChromeCmd = 91, 
    FirefoxCmd = 224,
}

export interface IKeyboardEventData {
    key: string;
    ctrl: boolean;
    alt: boolean;
    shift: boolean;
    cmd: boolean;
}

export function populateKeyboardData(event: KeyboardEvent, keyboardData: IKeyboardEventData): void {
    keyboardData.key = event.key;
    keyboardData.ctrl = event.ctrlKey;
    keyboardData.alt = event.altKey;
    keyboardData.shift = event.shiftKey;
    keyboardData.cmd = event.metaKey;
}