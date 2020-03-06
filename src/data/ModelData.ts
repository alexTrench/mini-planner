import { Vec3 } from "engine/Vec3";
import { Transform } from "engine/Transform";
import { WorktopMaterial } from "data/WorktopMaterialBorderDisplayColour";

export enum WidgetType {
    BaseUnitA = "BaseUnitA",
    BaseUnitB = "BaseUnitB",
    WallUnitA = "WallUnitA",
    WallUnitB = "WallUnitB",
    TowerUnitA = "TowerUnitA",
    TowerUnitB = "TowerUnitB",
    WorktopA = "WorktopA",
    WorktopB = "WorktopB",
    DecorBaseA = "DecorBaseA",
    DecorBaseB = "DecorBaseB",
    DecorWallA = "DecorWallA",
    DecorWallB = "DecorWallB",
    DecorTowerA = "DecorTowerA",
    DecorTowerB = "DecorTowerB"
}

export enum WidgetModule {
    BaseUnit = "BaseUnitWidget",
    WallUnit = "WallUnitWidget",
    TowerUnit = "TowerUnitWidget",
    DecorPanel = "DecorPanelWidget",
    Worktop = "WorktopWidget",
}


const defaultMaterial = "#FFFFFF";
export const defaultScaleVector = Vec3.New(0.2, 0.2, 0.2);
const defaultTranslation = Vec3.New(400, 400, 400);
const defaultRotation = 0;
const defaultTransform = new Transform(
    defaultTranslation,
    defaultRotation,
    defaultScaleVector
);

export interface IModelData {
    readonly module: WidgetModule;
    dimensions: Vec3;
    transform: Transform;
    material: string;
    widgetType: WidgetType;
}

export interface IWorktopModelData extends IModelData {
    material: WorktopMaterial;
}

export function createModel(module: WidgetModule, dimensions: Vec3, transform: Transform, material: string, widgetType: WidgetType): IModelData {
    return {
        module,
        dimensions,
        transform,
        material,
        widgetType,
    };
}

export function createWorktopModel(dimensions: Vec3, transform: Transform, material: WorktopMaterial, widgetType: WidgetType): IWorktopModelData {
    return {
        module: WidgetModule.Worktop,
        dimensions,
        transform,
        material,
        widgetType,
    };
}

export function cloneModel(model: IModelData): IModelData {
    const newModel: any = {};

    // TODO:
    // Update this when the model gets more complicated.
    for (const [key, value] of Object.entries(model)) {
        newModel[key] = typeof value === 'string'
            ? value
            : value.clone();
    }

    return newModel;
}

export const DEFAULT_WIDGET_MODEL_DATA: ReadonlyMap<WidgetType,
    IModelData> = new Map([
    [WidgetType.BaseUnitA, createModel(WidgetModule.BaseUnit, Vec3.New(600, 720, 620), defaultTransform, defaultMaterial, WidgetType.BaseUnitA)],
    [WidgetType.BaseUnitB, createModel(WidgetModule.BaseUnit, Vec3.New(600, 720, 450), defaultTransform, defaultMaterial, WidgetType.BaseUnitB)],
    [WidgetType.WallUnitA, createModel(WidgetModule.WallUnit, Vec3.New(600, 720, 400), defaultTransform, defaultMaterial, WidgetType.WallUnitA)],
    [WidgetType.WallUnitB, createModel(WidgetModule.WallUnit, Vec3.New(600, 720, 330), defaultTransform, defaultMaterial, WidgetType.WallUnitB)],
    [WidgetType.TowerUnitA, createModel(WidgetModule.TowerUnit, Vec3.New(500, 1920, 620), defaultTransform, defaultMaterial, WidgetType.TowerUnitA)],
    [WidgetType.TowerUnitB, createModel(WidgetModule.TowerUnit, Vec3.New(600, 1920, 450), defaultTransform, defaultMaterial, WidgetType.TowerUnitB)],
    [WidgetType.WorktopA, createWorktopModel(Vec3.New(3000, 40, 600), defaultTransform, WorktopMaterial.AfricanTeak, WidgetType.WorktopA)],
    [WidgetType.WorktopB, createWorktopModel(Vec3.New(3000, 40, 600), defaultTransform, WorktopMaterial.CementNoir, WidgetType.WorktopB)],
    [WidgetType.DecorBaseA, createModel(WidgetModule.DecorPanel, Vec3.New(20, 720, 620), defaultTransform, defaultMaterial, WidgetType.DecorBaseA)],
    [WidgetType.DecorBaseB, createModel(WidgetModule.DecorPanel, Vec3.New(20, 720, 430), defaultTransform, defaultMaterial, WidgetType.DecorBaseA)],
    [WidgetType.DecorWallA, createModel(WidgetModule.DecorPanel, Vec3.New(20, 720, 400), defaultTransform, defaultMaterial, WidgetType.DecorWallA)],
    [WidgetType.DecorWallB, createModel(WidgetModule.DecorPanel, Vec3.New(20, 720, 330), defaultTransform, defaultMaterial, WidgetType.DecorWallB)],
    [WidgetType.DecorTowerA, createModel(WidgetModule.DecorPanel, Vec3.New(20, 1920, 620), defaultTransform, defaultMaterial, WidgetType.DecorTowerA)],
    [WidgetType.DecorTowerB, createModel(WidgetModule.DecorPanel, Vec3.New(20, 1920, 450), defaultTransform, defaultMaterial, WidgetType.DecorTowerB)],
]);
