import {Widget} from "widgets/Widget";
import {WidgetType} from "data/ModelData";
import {WorktopMaterial} from "data/WorktopMaterialBorderDisplayColour";
import {WorktopWidget} from "widgets/WorktopWidget";

interface IBasketArray {
    widgetType: WidgetType;
    widgetMaterial: string;
    width?: number;
    height?: number;
    price: any;
}

export class Basket {


    protected worktopMaterialPrices: ReadonlyMap<WorktopMaterial, number> = new Map(
        [
            [WorktopMaterial.AfricanTeak, 50],
            [WorktopMaterial.CementNoir, 70]
        ]
    );
    protected unitTypePrices: ReadonlyMap<WidgetType, number> = new Map([
        [WidgetType.WallUnitA, 20],
        [WidgetType.WallUnitB, 40],
        [WidgetType.BaseUnitA, 30],
        [WidgetType.BaseUnitB, 50],
        [WidgetType.TowerUnitA, 80],
        [WidgetType.TowerUnitB, 100],
        [WidgetType.DecorWallA, 20],
        [WidgetType.DecorWallB, 40],
        [WidgetType.DecorBaseA, 40],
        [WidgetType.DecorBaseB, 50],
        [WidgetType.DecorTowerA, 70],
        [WidgetType.DecorTowerB, 80],

    ]);

    protected basketWidgets: IBasketArray[] = [];


    constructor(private widgets: Array<Widget>) {
        this.widgets = widgets;
    }

    public convertMillimetersToMeters(value: number){
        return value / 1000;
    }

    public calculateWorktopPrice(pricePerSquareMeter: number, width: number, height: number) {
        // mm to metres
        const widthInMetres = this.convertMillimetersToMeters(width);
        const depthInMetres = this.convertMillimetersToMeters(height);
        const worktopSquareMetres = widthInMetres * depthInMetres;
        return (worktopSquareMetres * pricePerSquareMeter).toFixed(2);
    }

    public calculateBasket() {
        for (const widget of this.widgets) {
            const {x, z} = widget.model.dimensions;
            if (widget instanceof WorktopWidget) {
                const worktopPricePerMeter = this.worktopMaterialPrices.get(widget.model.material!);
                const worktopPrice = this.calculateWorktopPrice(worktopPricePerMeter!, x, z);
                const widgetInfo = {
                    widgetType: widget.model.widgetType,
                    width: x, height: z,
                    widgetMaterial: widget.model.material,
                    price: worktopPrice
                };

                this.basketWidgets.push(widgetInfo);

            } else if (this.unitTypePrices.get(widget.model.widgetType)) {

                const basketType = widget.model.widgetType;
                const unitPrice = this.unitTypePrices.get(basketType);
                const widgetInfo = {
                    widgetType: basketType,
                    widgetMaterial: widget.model.material,
                    price: unitPrice
                };

                this.basketWidgets.push(widgetInfo);
            }
            //included for use of testing until UI is developed.
            console.log(this.basketWidgets)
        }
    }

    public updateBasketFromKitchen(widgets: Array<Widget>) {
        this.widgets = widgets;
        this.basketWidgets = [];
        this.calculateBasket();
    }

}
