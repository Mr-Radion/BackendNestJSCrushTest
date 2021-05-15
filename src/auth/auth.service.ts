import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}
  async login(userDto: CreateUsersDto) {}

  async registration(userDto: CreateUsersDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    // если пользователь с таким email существует
    if (candidate) {
      // особый синтаксис ошибок в Nestjs, в первый параметр передаем сообщение, а вторым статус код
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
    }
    // если такого пользователя не существует, надо создать, для начала шифруем пароль
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    // создаем пользователя и перезаписываем поле password
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  // на основе данных пользователя сгенерируем JWT токен
  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      // опции передавать в jwtService.sign больше никакие ненадо, т.к. мы уже указали при регистрации auth модуля, включая приватный ключ
      token: this.jwtService.sign(payload),
    };
  }
}
