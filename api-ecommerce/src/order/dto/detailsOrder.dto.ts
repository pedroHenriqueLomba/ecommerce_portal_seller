export class DetailsOrderDto {
  costumer: {
    name: string;
    email: string;
    cpf: string;
  };
  products: {
    sku: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  info: {
    total: number;
    date: Date;
  };

  constructor(costumer, products, info) {
    this.costumer = costumer;
    this.products = products;
    this.info = info;
  }
}
