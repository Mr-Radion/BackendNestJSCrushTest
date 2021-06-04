import { AuthService } from './auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUsersDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe) // валидация логина и пароля, ешить вопрос с дублирование этой валидации в контролере создания юзера
  @Post('/registration')
  registration(@Body() userDto: CreateUsersDto) {
    return this.authService.registration(userDto);
  }
}
