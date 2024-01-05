export class OrderListItem {
  public _id: string;
  public createdAt: Date;
  public total: number;


  constructor({_id, createdAt, total}: { _id: string, createdAt: Date, total: number }) {
    this._id = _id;
    this.createdAt = createdAt;
    this.total = total;
  }
}
