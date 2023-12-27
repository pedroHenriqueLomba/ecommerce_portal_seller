import Product from "src/product/entities/product.entity";

export class CartItemDto {
    public sku: string;
    public title: string;
    public price: number;
    public quantity: number;

    constructor (product: Product){
        this.sku = product.sku;
        this.title = product.title;
        this.price = product.price;
    }
}