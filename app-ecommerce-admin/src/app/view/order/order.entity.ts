import OrderProduct from './orderProduct.entity';

export class Order {
    orderProducts: OrderProduct[] = [];
    costumer_cpf: string = '';
    total: number = 0;
}
