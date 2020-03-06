import { Widget } from "widgets/Widget";

export class ItemIdGenerator {
    private maxIdInUse = 0;
    private idsToReuse = new Set();

    /**
     *To be used when widgets can be deleted by user.
     */
    public releaseId = (id: number): void => {
        this.idsToReuse.add(id);
    };

    public setMaxId = (widgets: Widget[]) => {
        this.maxIdInUse = widgets.length;
    };

    public incrementMaxIdInUse = (): number => {
        ++this.maxIdInUse;
        return this.maxIdInUse;
    };

    private getReusedId = () => {
        const idRetrieved: number = this.idsToReuse.values().next().value;

        this.idsToReuse.delete(idRetrieved);

        return idRetrieved;
    };

    public getUniqueWidgetId() {
        const newId =
            this.idsToReuse.size > 0
                ? this.getReusedId()
                : this.incrementMaxIdInUse();

        return newId;
    }
}
