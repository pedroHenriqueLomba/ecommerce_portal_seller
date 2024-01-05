export class ListOrderCostumerDto {
    _id: string;
    total: number;
    createdAt: Date;

    constructor({ _id, total, createdAt }) {
        this._id = _id;
        this.total = total;
        this.createdAt = createdAt;
    }
}