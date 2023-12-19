import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
    @IsBoolean()
    active: boolean;

    constructor({ title, description, price, active }: UpdateProductDto) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.active = active;
    }
}
