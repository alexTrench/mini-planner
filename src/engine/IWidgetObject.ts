import { WorktopMaterial } from "data/WorktopMaterialBorderDisplayColour";
import { WidgetModule, WidgetType } from "data/ModelData";

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
    readonly module: WidgetModule;

    position: IPositionData;
    dimensions: IDimensionsData;
    rotation: number;
    type: string;
    material: string;
    widgetType: WidgetType;
}

export interface IWorktopWidgetInfo extends IDefaultWidgetInfo {
    points: IPositionDataXZ[];
    material: WorktopMaterial;
}

export interface IKitchenInfo {
    planName: string;
    assetUrl: "https://static.wrenkitchens.com/3d-assets-2018-3/webgl/";
    roomDimensions: IDimensionsData;
    items: IDefaultWidgetInfo[];
}
