import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    // на сайте jwt.io можно проверить декодировав, все ли передается
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SERCRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ], // signOptions это время жизни access токена, в будущем добавить рефреш токен
  // экспортируем, чтобы мы могли использовать защиту ендпоинтов от неавторизованных пользователей
  // JwtModule на всякий мб он нам пригодится
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
