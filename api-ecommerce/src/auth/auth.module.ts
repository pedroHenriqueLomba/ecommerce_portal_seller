import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CostumerModule } from 'src/costumer/costumer.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';


@Module({
  imports: [CostumerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}