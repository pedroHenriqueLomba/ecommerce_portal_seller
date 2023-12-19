import { Module } from '@nestjs/common';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CostumerSchema, CostumerSchemaFactory } from './schemas/costumer.schema';
import Paginator from 'src/helpers/paginator/paginator';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: CostumerSchema.name,
      schema: CostumerSchemaFactory
    }])
  ],
  controllers: [CostumerController],
  providers: [CostumerService, Paginator]
})
export class CostumerModule { }
