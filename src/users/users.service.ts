import { RolesService } from './../roles/roles.service';
import { User } from './users.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUsersDto } from './dto/create-users.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

// сервисы основной источник бизнес логики, тут валидация, запросы к бд который ссылается из контроллера
// помечаем эту функцию провайдером для модуля, поскольку этот сервис мы будем внедрять в контроллер, тоесть делать иньекцию
// в service как обычно логика, запросы к бд, валидация и т.п. контролеры лишь должны получать какой-то ответ и возвращать, как чистые функции
@Injectable()
export class UsersService {
  // userRepository - это наша бд таблица указанная в @InjectModel(User)
  // ts позволяет нам добавлять через конструктор переменные таким образом создавая их, private - это 1 из модификаторов полей в ts
  // есть еще ts модификаторы полей protected - поля которые видны только внутри классов и наследуемых от них классов, тоесть не
  // вытащить свойство снаружи обратившись к классу
  // public это по умолчанию такие поля, мы просто так можем указать конкретно, они доступны для всех и внутри и снаружи
  // а private метод в отличии от protected доступен только внутри класса в котором он был создан
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    // надо по умолчанию пользователям добавить опр роль
    private roleService: RolesService,
  ) {} // ts запишет за нас в свойство this.userRepository: typeof User, если в скобках в конструкторе указать, как указали
  // в параметры сервиса входит DTO объект
  async createUser(dto: CreateUsersDto) {
    const user = await this.userRepository.create(dto);
    // получаем из бд роль, чтобы присвоить ее юзеру
    const role = await this.roleService.getRoleByValue('USER');
    // метод $set позволяет записать в табл какое-то поле и сразу обновить в бд
    await user.$set('roles', [role.id]);
    // вручную вписали в тело ответа роль, ибо $set записывает лишь в бд в связанную табл many to many
    user.roles = [role];
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

  async addRole(dto: AddRoleDto) {
    // сначала получим пользователя findByPk тут Pk - это Primary Key внутренний ключ, что и есть id пользователя
    const user = await this.userRepository.findByPk(dto.userId);
    // теперь надо получить роль из бд по уже готовому сервису поиска ролей
    const role = await this.roleService.getRoleByValue(dto.value);
    // если пользователь и указанная роль существуют в бд, то делаем эту роль
    if (role && user) {
      // делаем с помощью функции $add первым ключом указываем поле, которое хотим добавить, а вторым параметром значение
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      // если пользователь не был найден, бросим ошибку
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    // получаем пользователя и перезаписываем его поле ban
    user.banned = true;
    user.banReason = dto.banReason; // указываем причину блокировки
    // вызываем функцию .save() тем самым обновляя значение в бд
    await user.save();
    return user;
  }
}
