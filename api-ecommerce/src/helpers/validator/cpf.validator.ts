import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'noNumbers', async: false })
export class cpfValidator implements ValidatorConstraintInterface {
    validate(cpfValue: string) {
        return cpf.isValid(cpfValue);
    }

    defaultMessage() {
        return `O CPF é inválido.`;
    }
}
