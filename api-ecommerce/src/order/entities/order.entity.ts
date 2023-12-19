import Item from "./item.entity";

export default class Order {
    items: Item[];
    costumer_cpf: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}