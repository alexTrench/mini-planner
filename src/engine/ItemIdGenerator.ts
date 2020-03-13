import { Widget } from "widgets/Widget";

export class ItemIdGenerator {
    private maxIdInUse = 0;
    private idsToReuse = new Set();

    public releaseId = (id: number): void => {
        this.idsToReuse.add(id);
    };

    public setMaxId = (widgets: Widget[]): void => {
        this.maxIdInUse = widgets.length;
    };

    public incrementMaxIdInUse = (): number => {
        ++this.maxIdInUse;
        return this.maxIdInUse;
    };

    private getReusedId = (): number => {
        const idRetrieved: number = this.idsToReuse.values().next().value;

        this.idsToReuse.delete(idRetrieved);

        return idRetrieved;
    };

    public getUniqueWidgetId(): number {
        const newId =
            this.idsToReuse.size > 0
                ? this.getReusedId()
                : this.incrementMaxIdInUse();

        return newId;
    }
}
