import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // чтобы контроллер заработал его надо зарегистрировать в этом модуле, массив поскольку контроллеров может быть несколько
  controllers: [AppController],
  // providers может быть любой переиспользуемый компонент нашего приложения, это либо service с бизнес логикой, либо lib имплементации
  // простыми словами это все, что имеет логику и может использоваться в разных компонентах
  // @Injectable() - чтобы пометить функцию провайдером в next.js для этого модуля
  providers: [AppService],
})
export class AppModule {}
