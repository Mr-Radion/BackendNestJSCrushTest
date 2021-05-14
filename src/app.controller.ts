import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  // чтобы функции из модуля providers стали доступными, мы должны сделать иньекцию след вида
  // таким способом нам нет нужды создавать объект из класса new AppService, мы им просто пользуемся
  constructor(private appService: AppService) {}
  // так вот просто в nest делается запрос, вместо роутинга над методом в контроллере @Get('users)
  // а здесь создавать какие-то роутеры нету необходимости
  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }
}
