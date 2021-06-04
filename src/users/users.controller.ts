import { Body, Controller, Post, Get, UseGuards, UsePipes, Delete, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from './dto/create-users.dto';
import { User } from './users.model';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  // чтобы функции из модуля providers стали доступными, мы должны сделать иньекцию след вида
  // таким способом нам нет нужды создавать объект из класса new AppService, мы им просто пользуемся
  constructor(private userService: UsersService) {}
  // так вот просто в nest делается запрос, вместо роутинга над методом в контроллере @Post()
  // а здесь создавать какие-то роутеры нету необходимости
  // @Body() userDto: CreateUsersDto - в тело запроса create принимает шаблон из полей CreateUsersDto
  @ApiOperation({ summary: 'Создание пользователя через почту' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe) // валидация логина и пароля
  @Post()
  create(@Body() userDto: CreateUsersDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put()
  edit(@Body() userDto: CreateUsersDto) {
    return this.userService.editUser(userDto);
  }

  @ApiOperation({ summary: 'Выдача ролей' })
  @ApiResponse({ status: 200 }) // type: [User] - тут вместо type: User[]
  // @UseGuards(JwtAutGuard) // защита ендпоинта от неавторизованных пользователей, но можно делать глобально в main.js для всех ендпоинтов
  @Roles('ADMIN') // функция добавления ролей доступна только для админа
  @UseGuards(RolesGuard) // тут и проверка авторизован пользователь или нет и проверка ролей указанных в самодельном декораторе @Roles
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 }) // type: [User] - тут вместо type: User[]
  // @UseGuards(JwtAutGuard) // защита ендпоинта от неавторизованных пользователей, но можно делать глобально в main.js для всех ендпоинтов
  @Roles('ADMIN') // функция добавления ролей доступна только для админа
  @UseGuards(RolesGuard) // тут и проверка авторизован пользователь или нет и проверка ролей указанных в самодельном декораторе @Roles
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] }) // type: [User] - тут вместо type: User[]
  // @UseGuards(JwtAutGuard) // защита ендпоинта от неавторизованных пользователей, но можно делать глобально в main.js для всех ендпоинтов
  @Roles('ADMIN', 'MANAGER') // вызываем самодельный декоратор Roles и в него через запятую указываем каким ролям доступен данный ендпоинт
  @UseGuards(RolesGuard) // тут и проверка авторизован пользователь или нет и проверка ролей указанных в самодельном декораторе @Roles
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @Delete(':id')
  remove(@Param() id) {
    // return this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Удаление роли пользователя' })
  @Post('role/delete')
  removeRole() {
    return this.userService.removeRoleUser();
  }
}
