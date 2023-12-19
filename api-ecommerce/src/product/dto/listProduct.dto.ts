export class ListProductDto {
    sku: string;
    title: string;
    price: number;
    active: boolean;

    constructor({sku, title, price, active}) {
        this.sku = sku;
        this.title = title;
        this.price = price;
        this.active = active;
    }
}