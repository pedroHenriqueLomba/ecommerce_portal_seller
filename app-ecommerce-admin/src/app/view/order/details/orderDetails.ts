export class OrderDetails {
  costumer!: {
    name: string;
    email: string;
    cpf: string;
  };
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

  constructor(costumer: any, products: any, info: any) {
    this.costumer = costumer;
    this.products = products;
    this.info = info;
  }
}
