import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

// создадим guard с ролями, т.е если пользователь не администратор, то он не может обращаться к некоторым ендпоинтам
// например создание ролей, регистрация администратора (первого вручную регистрируем), создание мероприятий, бан пользователей

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      // в доке есть про рефлектор
      const requireqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        // массив данных, чтобы рефлектор понимал, какие данные ему доставать
        context.getHandler(),
        context.getClass(),
      ]);
      // если этих ролей у нас нету и requireqRoles вернул null, то мы возвращаем true и эта функция будет доступна всем пользователям
      if (!requireqRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      // проверяем есть ли у пользователя роль, которая необходима для конкретного ендпоинта
      // если есть такая роль, то доступ разрешен и вернет true, в обратном случае false и вернет ошибку
      return user.roles.some(role => requireqRoles.includes(role.value));
    } catch (error) {
      // FORBIDDEN - это код 403 применяется когда нет доступа
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN); // каждому методу соответствует номер кода при нажатии ctrl+клик левый видно коды
    }
  }
}
