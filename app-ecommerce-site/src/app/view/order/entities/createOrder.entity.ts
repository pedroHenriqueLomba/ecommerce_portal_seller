import { OrderItem } from "./orderItem.entity";

export class CreateOrder {
    public items!: OrderItem[];
    constructor(){
        this.items = [];
    }
}
