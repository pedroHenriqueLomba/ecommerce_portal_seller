import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    sku: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
    @IsBoolean()
    active: boolean;

}