import QueryPaginator from './query.paginator';
import { Model } from 'mongoose';

export default class Paginator {
    async paginate(query: QueryPaginator, model: Model<any>, dto?: any): Promise<any> {
        if(query.page < 1) query.page = 1;
        const total = model.countDocuments(query.filter).exec();
        const totalPages = Math.ceil(await total / query.perPage);
        const data = await model.find(query.filter).skip((query.page - 1) * query.perPage).limit(query.perPage).sort({_id: -1}).exec();
        const dataPaginated = {
            data: dto ? data.map(item => new dto(item)) : data,
            total: await total,
            totalPages: totalPages,
        };
        return dataPaginated;
    }
}