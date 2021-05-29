import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    // на jwt.io можно проверить декодировав, все ли передается
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SERCRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ], // secret вместо privateKey, signOptions это время жизни токена
})
export class AuthModule {}
