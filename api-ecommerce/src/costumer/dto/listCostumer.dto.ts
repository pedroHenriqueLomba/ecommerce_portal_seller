export class ListCostumerDto {
    cpf: string;
    email: string;
    name: string;

    constructor({cpf, email, name}) {
        this.cpf = cpf;
        this.email = email;
        this.name = name;
    }
}