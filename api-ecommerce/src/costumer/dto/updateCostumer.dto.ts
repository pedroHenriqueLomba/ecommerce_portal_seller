import {
  IsBoolean,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { cpfValidator } from 'src/helpers/validator/cpf.validator';
import { NoNumbersValidator } from 'src/helpers/validator/noNumbers.validator';

export default class UpdateCostumerDto {
  @IsString()
  @Validate(NoNumbersValidator)
  readonly name: string;

  @IsString()
  @Validate(cpfValidator)
  readonly cpf: string;
  
  @IsString()
  readonly oldPassword: string;

  @IsString()
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
  readonly password: string;
}
