import { RolesService } from './roles.service';
import { Body, Controller, Post, Get, Param, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post() // внизу работает и конструкция @Body() body, но правильнее будет ерез dto, для типизации и валидации входных данных
  @HttpCode(HttpStatus.CREATED) // более осмыслены нежели коды ответов,
  // если навести или нажать ctrl+левый клик, то можно посмотреть все коды ответов и их названия, тут не нужно даже придумывать
  @Header('Cache-Control', 'none') // так можем заголовки указывать, не забыть что мы должны разрешить кэширование с бэка
  // есть также возможность вызывать общие req, res об этом в доке, но их не рекомендуется, это грубый стиль
  create(@Body() userDto: CreateRoleDto) {
    return this.roleService.createRole(userDto);
  }

  @Get('/:value') // здесь уже будет динамический роут, в @Param передаем название динамической переменной :value
  // можем в скобках внизу прописать @Param() params, тогда нам будут доступны все параметры params.value и т.п. как пропсы
  // @Redirect('http://google.com', 301) // таким образом можно сделать редирект
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
