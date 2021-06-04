import { AuthModule } from './../auth/auth.module';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

// то что начинается с @ это декораторы из ts, а внутри используются замыкания и дескрипторы
// пример имплементации декоратора @Module в dist билде, для понимания что и как работает внизу ссылки
// про дескрипторы тут https://www.youtube.com/watch?v=z5h-iQSB6Dw
// с 1 часа 15 мин про декораторы тут https://www.youtube.com/watch?v=7NU6K4170As&list=RDCMUCg8ss4xW9jASrqWGP30jXiw&index=2
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // в roles.module export поэтому тут можно модуль экспортировать вместе с его конфигурациями,
  // чтобы получить в нашем случае доступ к RoleService
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  // когда в ошибке кольцевая зависимость ибо AuthModule используется в usermodule и наоборот usermodule используется в authmodule
  // чтобы избежать этого оборачиваем модуль в функцию forwardRef(() => AuthModule)
  exports: [UsersService],
})
export class UsersModule {}
