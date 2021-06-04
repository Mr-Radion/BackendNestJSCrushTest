import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from './dto/create-users.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { JwtAutGuard } from '../auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  // чтобы функции из модуля providers стали доступными, мы должны сделать иньекцию след вида
  // таким способом нам нет нужды создавать объект из класса new AppService, мы им просто пользуемся
  constructor(private userService: UsersService) {}
  // так вот просто в nest делается запрос, вместо роутинга над методом в контроллере @Post()
  // а здесь создавать какие-то роутеры нету необходимости
  // @Body() userDto: CreateUsersDto - в тело запроса create принимает шаблон из полей CreateUsersDto
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUsersDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] }) // type: [User] - тут вместо type: User[]
  // @UseGuards(JwtAutGuard) // защита ендпоинта от неавторизованных пользователей, но можно делать глобально в main.js для всех ендпоинтов
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
