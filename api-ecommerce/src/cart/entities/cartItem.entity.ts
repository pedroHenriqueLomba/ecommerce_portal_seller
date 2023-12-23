import { IsNumber, IsString } from "class-validator";

export class CartItem {
    @IsString()
    sku: string;
    @IsNumber()
    quantity: number;
}