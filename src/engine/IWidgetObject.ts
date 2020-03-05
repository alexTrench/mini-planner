export interface IPositionDataXZ {
    x: number;
    z: number;
}

export interface IPositionData {
    x: number;
    y: number;
    z: number;
}

export interface IDimensionsData {
    w: number;
    d: number;
    h: number;
}

export interface IDefaultWidgetInfo {
    readonly id: number;

    position: IPositionData;
    dimensions: IDimensionsData;
    rotation: number;
    type: string;
    material: string;
}

export interface IWorktopWidgetInfo extends IDefaultWidgetInfo {
    points: IPositionDataXZ[];
}

export interface IKitchenInfo {
    assetUrl: "https://static.wrenkitchens.com/3d-assets-2018-3/webgl";
    roomDimensions: IDimensionsData;
    items: IDefaultWidgetInfo[];
}
