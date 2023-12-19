import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'noNumbers', async: false })
export class NoNumbersValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const pattern = /^[^\d]+$/;
    return pattern.test(text);
  }

  defaultMessage(args) {
    return `O campo ${args.property} não pode conter números`;
  }
}
