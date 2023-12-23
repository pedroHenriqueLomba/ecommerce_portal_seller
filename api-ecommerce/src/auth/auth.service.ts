import { cpf } from 'cpf-cnpj-validator';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CostumerService } from 'src/costumer/costumer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private costumerService: CostumerService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const costumer = await this.costumerService.findByEmail(email);
    if (costumer?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { name: costumer.name, cpf: costumer.cpf };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: costumer.name,
    };
  }
}
