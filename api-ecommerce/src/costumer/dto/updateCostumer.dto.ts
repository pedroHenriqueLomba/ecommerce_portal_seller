import {
  IsBoolean,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { NoNumbersValidator } from 'src/helpers/validator/noNumbers.validator';

export default class UpdateCostumerDto {
  @IsString()
  @Validate(NoNumbersValidator)
  readonly name: string;
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
