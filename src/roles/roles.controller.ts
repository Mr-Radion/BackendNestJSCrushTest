import { RolesService } from './roles.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Post()
  create(@Body() userDto: CreateRoleDto) {
    return this.roleService.createRole(userDto);
  }

  @Get('/:value') // здесь уже будет динамический роут, в @Param передаем название динамической переменной :value
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
