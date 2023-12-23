import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { cpfValidator } from 'src/helpers/validator/cpf.validator';
import { NoNumbersValidator } from 'src/helpers/validator/noNumbers.validator';

export default class CreateCostumerDto {
  @IsString()
  @Validate(NoNumbersValidator)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    {
      message:
        'A senha deve conter pelo menos 8 caracteres',
    },
  )
  password: string;

  @IsString()
  @Validate(cpfValidator)
  cpf: string;
}
