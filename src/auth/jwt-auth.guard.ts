import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
// роль guards в ограничении доступа для определенных ендпоинтов(как защита роутов)
// это класс который имплемитирует класс CanActivate
// в нашем случае реализуем guard запрещающий обращаться неавторизованным пользователям к тем или иным ендпоинтам

@Injectable()
export class JwtAutGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // логика данного обязательного метода элементарна если возвращает true доступ запрещен, false доступ запрещен
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // еще один способ получения req или res из контекста, тут можно вытаскивать хедеры, тело запроса и т.д.
    const req = context.switchToHttp().getRequest();
    try {
      // вот так мы заголовок запроса принимаем с названием authorization, можно для каждого запроса/ендпоинта применить
      const authHeader = req.headers.authorization;
      // т.к. хедер состоит из 2 частей это тип токена и сам токен, надо распарсить по пробелу делим на части
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      // по итогу получается массив из 2 объектов
      // далее проверка
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }
      // если проверка пройдена, раскодируем токен c помощью .verify
      const user = this.jwtService.verify(token);
      // после раскодирования мы помещаем пользователя в req и возвращаем true
      req.user = user;
      return true;
    } catch (error) {
      // throw new Error('Method not implemented.');
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }
}
