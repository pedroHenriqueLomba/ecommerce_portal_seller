export class OrderDetails {
  products!: {
    sku: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  info!: {
    total: number;
    date: Date;
  };

  constructor(products: any, info: any) {
    this.products = products;
    this.info = info;
  }
}
