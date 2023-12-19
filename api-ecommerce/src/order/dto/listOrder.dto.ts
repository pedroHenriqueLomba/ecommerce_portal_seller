export class ListOrderDto {
    _id: string;
    total: number;
    costumer_cpf: string;

    constructor({ _id, total, costumer_cpf }) {
        this._id = _id;
        this.total = total;
        this.costumer_cpf = costumer_cpf;
    }
}