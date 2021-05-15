import { User } from './users/users.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  // чтобы контроллер заработал его надо зарегистрировать в этом модуле, массив поскольку контроллеров может быть несколько
  controllers: [],
  // providers может быть любой переиспользуемый компонент нашего приложения, это либо service с бизнес логикой, либо lib имплементации
  // простыми словами это все, что имеет логику и может использоваться в разных компонентах
  // @Injectable() - чтобы пометить функцию провайдером в next.js для этого модуля
  providers: [],
  // мы можем импортировать в наш модуль другие. в данном случае само подключение и конфигурация к бд
  imports: [
    // путь до файла конфигурации
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`,
    // }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: Number(process.env.POSTGRESS_PORT),
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRESS_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   // регистрируем в бд модели
    //   models: [User, Role, UserRoles],
    //   // флаг чтобы SequelizeModule создавал таблицы в бд, на основании моделей, которые мы будем создавать
    //   autoLoadModels: true,
    // }),

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
