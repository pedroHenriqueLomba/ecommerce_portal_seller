import { Controller, Request, UseGuards } from '@nestjs/common';
import { Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import CreateCostumerDto from './dto/createCostumer.dto';
import UpdateCostumerDto from './dto/updateCostumer.dto';
import QueryPaginator from 'src/helpers/paginator/query.paginator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListCostumerDto } from './dto/listCostumer.dto';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Get()
  findAll(@Query() query) {
    const queryPaginator = new QueryPaginator(
      query.filter || '{}',
      query.page || 0,
      query.perPage || 10,
    );
    return this.costumerService.findAll(queryPaginator);
  }

  @UseGuards(AuthGuard)
  @Get('info')
  async findWithToken(@Request() req) {
    const data = new ListCostumerDto(
      await this.costumerService.findByCpf(req.user.cpf),
    );
    return data;
  }

  @Get(':cpf')
  findByCpf(@Param('cpf') cpf: string) {
    try {
      return this.costumerService.findByCpf(cpf);
    } catch (error) {
      return error;
    }
  }

  @Post()
  create(@Body() costumerData: CreateCostumerDto) {
    return this.costumerService.create(costumerData);
  }

  @UseGuards(AuthGuard)
  @Put('')
  update(@Body() costumerData: UpdateCostumerDto, @Request() req) {
    try {
      return this.costumerService.update(req.user.cpf, costumerData);
    } catch (error) {
      return error;
    }
  }
}
