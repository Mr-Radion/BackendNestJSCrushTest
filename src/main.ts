import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAutGuard } from './auth/jwt-auth.guard';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Builder позволяет задать для объекта, какие-то параметры/поля со своими значениями
  const config = new DocumentBuilder()
    .setTitle('Продвинутый backend на Nestjs')
    .setDescription('Документация REST-API')
    .setVersion('1.0.0') // первая версия приложения, затем она может сама инкремитироваться
    .addTag('Yana Zachetnaya')
    .build();

  // первым параметром передаем инстанс нашего приложения app
  const documentApi = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentApi);

  // app.useGlobalGuards(JwtAutGuard); так можно глобально задавать защиту ендпоинтов и добавлять несколько гвардов

  await app.listen(PORT, () => console.log(`Server started on port - ${PORT}`));
}

start();
