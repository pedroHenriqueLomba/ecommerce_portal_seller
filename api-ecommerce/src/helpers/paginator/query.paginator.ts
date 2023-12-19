export default class QueryPaginator {
    filter: object = {};
    page: number = 1;
    perPage: number = 10;

    constructor(filter: string, page: number, perPage: number) {
        this.filter = JSON.parse(filter);
        this.page = page;
        this.perPage = perPage;
    }
}