import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Costumer } from '../entities/costumer.entity';
import { HydratedDocument } from "mongoose";

export type CostumerDocument = HydratedDocument<CostumerSchema>;

@Schema({ collection: 'costumers', timestamps: true,  })
export class CostumerSchema implements Costumer {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true, unique: true })
    cpf: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, default: true })
    active: boolean;
}

export const CostumerSchemaFactory = SchemaFactory.createForClass(CostumerSchema);