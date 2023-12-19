import { IsBoolean, IsString, IsStrongPassword, Validate } from "class-validator";
import { NoNumbersValidator } from "src/helpers/validator/noNumbers.validator";

export default class UpdateCostumerDto {
    @IsString()
    @Validate(NoNumbersValidator)
    readonly name: string;
    @IsString()
    @IsStrongPassword({ minLength: 7, minLowercase: 1, minNumbers: 1, minSymbols: 0, minUppercase: 0 }, { message: 'A senha deve conter pelo menos 8 caracteres, contendo 1 letra e 1 número' })
    readonly password: string;
    @IsBoolean()
    readonly active: boolean;
}