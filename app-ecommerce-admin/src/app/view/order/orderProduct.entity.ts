import Product  from '../product/product.entity'

export default class OrderProduct {
    product: Product[] = [];
    quantity: number = 1;
}
