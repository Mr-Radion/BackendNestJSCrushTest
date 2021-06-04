import { ApiProperty } from '@nestjs/swagger';
// эта dto предназначена для создания ролей
export class CreateRoleDto {
  // можем ли мы отсюда как в простой авторизации в схеме настроить параметр роли по умолчанию юзера? или как
  // @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
  readonly value: string;
  // @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  readonly description: string; // описание роли на русском языке
}
