import { Controller } from '@nestjs/common';
import {
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query
} from '@nestjs/common';
import { CostumerService } from './costumer.service';
import CreateCostumerDto from './dto/createCostumer.dto';
import UpdateCostumerDto from './dto/updateCostumer.dto';
import QueryPaginator from 'src/helpers/paginator/query.paginator';

@Controller('costumer')
export class CostumerController {
    constructor(private costumerService: CostumerService) { }

    @Get()
    findAll(@Query() query) {
        const queryPaginator = new QueryPaginator(
            query.filter || '{}', 
            query.page || 0, 
            query.perPage || 10
        );
        return this.costumerService.findAll(queryPaginator);
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

    @Put(':id')
    update(@Body() costumerData: UpdateCostumerDto, @Param('id') id: string) {
        try {
            return this.costumerService.update(id, costumerData);
        } catch (error) {
            return error;
        }
    }

    @Delete(':id')
    disable(@Param('id') id: string) {
        try {
            return this.costumerService.disable(id);
        } catch (error) {
            return error;
        }
    }
}
