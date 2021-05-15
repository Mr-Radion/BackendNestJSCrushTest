import { RolesService } from './../roles/roles.service';
import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUsersDto } from './dto/create-users.dto';

// помечаем эту функцию провайдером для модуля, поскольку этот сервис мы будем внедрять в контроллер, тоесть делать иньекцию
// в service как обычно логика, запросы к бд, валидация и т.п. контролеры лишь должны получать какой-то ответ и возвращать, как чистые функции
@Injectable()
export class UsersService {
  // userRepository - это наша бд таблица указанная в @InjectModel(User)
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    // надо по умолчанию пользователям добавить опр роль
    private roleService: RolesService,
  ) {}
  // в параметры сервиса входит DTO объект
  async createUser(dto: CreateUsersDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    // метод $set позволяет записать в табл какое-то поле и сразу обновить в бд
    await user.$set('roles', [role.id]);
    return user;
  }
  async getAllUsers() {
    // в таблице user нету поля role, но мы добавим его в ответе запроса с помощью {include: {all: true}}
    // в include можно указать какую-то конкретную модель, которую мы хотим получить вместе с пользователем
    // но мы сделали all: true что означает, все поля с которыми у нас как-то связан пользователь подтянутся вместе с users в ответе
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  // создадим метод, который проверит есть ли в бд пользователь с конкретным email
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }
}
