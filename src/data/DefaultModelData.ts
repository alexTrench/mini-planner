import { Vec3 } from "engine/Vec3";

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

export interface IModelData {
    module: string;
    dimensions: Vec3;
}

export interface IWorktopModelData extends IModelData {
    material: string;
}

export const DEFAULT_WIDGET_MODEL_DATA: ReadonlyMap<
    WidgetType,
    IModelData
> = new Map([
    [
        WidgetType.BaseUnitA,
        {
            module: "BaseUnitWidget",
            dimensions: Vec3.New(600, 720, 620)
        }
    ],
    [
        WidgetType.BaseUnitB,
        {
            module: "BaseUnitWidget",
            dimensions: Vec3.New(600, 720, 450)
        }
    ],
    [
        WidgetType.WallUnitA,
        {
            module: "WallUnitWidget",
            dimensions: Vec3.New(600, 720, 400)
        }
    ],
    [
        WidgetType.WallUnitB,
        {
            module: "WallUnitWidget",
            dimensions: Vec3.New(600, 720, 330)
        }
    ],
    [
        WidgetType.TowerUnitA,
        {
            module: "TowerUnitWidget",
            dimensions: Vec3.New(500, 1920, 620)
        }
    ],
    [
        WidgetType.TowerUnitB,
        {
            module: "TowerUnitWidget",
            dimensions: Vec3.New(600, 1920, 450)
        }
    ],
    [
        WidgetType.WorktopA,
        {
            module: "WorktopWidget",
            dimensions: Vec3.New(3000, 40, 600),
            material: "African Teak"
        }
    ],
    [
        WidgetType.WorktopB,
        {
            module: "WorktopWidget",
            dimensions: Vec3.New(3000, 40, 600),
            material: "Cement Noir"
        }
    ],
    [
        WidgetType.DecorBaseA,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 720, 620)
        }
    ],
    [
        WidgetType.DecorBaseB,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 720, 430)
        }
    ],
    [
        WidgetType.DecorWallA,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 720, 400)
        }
    ],
    [
        WidgetType.DecorWallB,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 720, 330)
        }
    ],
    [
        WidgetType.DecorTowerA,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 1920, 620)
        }
    ],
    [
        WidgetType.DecorTowerB,
        {
            module: "DecorPanelWidget",
            dimensions: Vec3.New(20, 1920, 450)
        }
    ]
]);
