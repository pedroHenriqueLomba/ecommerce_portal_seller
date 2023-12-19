export class OrderUpdate {
  public items: OrderUpdateProduct[] = [];
}

export class OrderUpdateProduct {
  public sku!: string;
  public quantity!: number;
}
