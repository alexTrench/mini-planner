import {Widget} from "widgets/Widget";
import {WidgetType} from "data/ModelData";
import {WorktopMaterial} from "data/WorktopMaterialBorderDisplayColour";
import {WorktopWidget} from "widgets/WorktopWidget";
import {BasketStateUpdated, EventBus} from "engine/EventBus";


export interface IBasketItem {
    id: number;
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

    protected basketWidgets: IBasketItem[] = [];

    public convertMillimetersToMeters(value: number): number {
        return value / 1000;
    }

    public calculateWorktopPrice(pricePerSquareMeter: number, width: number, height: number): string {
        // mm to metres
        const widthInMetres = this.convertMillimetersToMeters(width);
        const depthInMetres = this.convertMillimetersToMeters(height);
        const worktopSquareMetres = widthInMetres * depthInMetres;
        return (worktopSquareMetres * pricePerSquareMeter).toFixed(2);
    }

    private calculateBasket(widgets: Widget[]): IBasketItem[] {
        this.basketWidgets =[];
        const basketItems: IBasketItem[] = [];

        for (const widget of widgets) {
            const {x, z} = widget.model.dimensions;
            if (widget instanceof WorktopWidget) {
                const worktopPricePerMeter = this.worktopMaterialPrices.get(widget.model.material!);
                const worktopPrice = this.calculateWorktopPrice(worktopPricePerMeter!, x, z);
                const widgetInfo = {
                    id: widget.id,
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
                    id: widget.id,
                    widgetType: basketType,
                    widgetMaterial: widget.model.material,
                    price: unitPrice
                };

                this.basketWidgets.push(widgetInfo);
            }
        }
        return basketItems;
    }

    public updateBasketFromKitchen(widgets: Widget[], eventBus: EventBus): void {
        const basketItems = this.calculateBasket(widgets);
        eventBus.publish(BasketStateUpdated, basketItems);
    }

    public getBasketContents(): IBasketItem[] {
        return this.basketWidgets;
    }

    public calculateTotal(): number {
        let total: number = 0;
        for (const widget of this.basketWidgets){
            total += Number(widget.price);
        }
        return total;
    }

}
