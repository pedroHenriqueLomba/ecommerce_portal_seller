import { ListCostumerDto } from './dto/listCostumer.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CostumerSchema } from './schemas/costumer.schema';
import { Model } from 'mongoose';
import CreateCostumerDto from './dto/createCostumer.dto';
import UpdateCostumerDto from './dto/updateCostumer.dto';
import { Costumer } from './entities/costumer.entity';
import Paginator from '../helpers/paginator/paginator';
import QueryPaginator from 'src/helpers/paginator/query.paginator';

@Injectable()
export class CostumerService {
  constructor(
    @InjectModel(CostumerSchema.name) private costumerModel: Model<Costumer>,
    private paginator: Paginator,
  ) {}

  findAll(query: QueryPaginator): any {
    return this.paginator.paginate(query, this.costumerModel, ListCostumerDto);
  }

  async findByCpf(cpf: string): Promise<CostumerSchema> {
    const selectedCostumer = await this.costumerModel
      .findOne({ cpf: cpf })
      .exec();
    if (!selectedCostumer)
      throw new HttpException('Cliente não encontrado', 404);
    return selectedCostumer;
  }

  // TODO VERIFICAR MANEIRA DE RETIRAR A LÓGICA DE VERIFICAÇÃO DE EMAIL DO SERVICE
  async create(costumerData: CreateCostumerDto): Promise<Costumer> {
    try {
      if (await this.costumerModel.findOne({ email: costumerData.email }))
        throw new HttpException('Email já cadastrado', 400);
      if (await this.costumerModel.findOne({ cpf: costumerData.cpf }))
        throw new HttpException('Cpf já cadastrado', 400);
      const newCostumer = new this.costumerModel(costumerData);
      const createdCostumer = await newCostumer.save();
      return createdCostumer;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(
    id: string,
    costumerData: UpdateCostumerDto,
  ): Promise<CostumerSchema> {
    const updatedCostumer = await this.costumerModel
      .findOneAndUpdate({ _id: id }, costumerData, { new: true })
      .exec();
    if (!updatedCostumer)
      throw new HttpException('Cliente não encontrado', 404);
    return updatedCostumer;
  }

  async disable(id: string): Promise<CostumerSchema> {
    const disabledCostumer = await this.costumerModel
      .findOneAndUpdate({ _id: id }, { $set: { active: false } }, { new: true })
      .exec();
    if (!disabledCostumer)
      throw new HttpException('Cliente não encontrado', 404);
    return disabledCostumer;
  }
}
