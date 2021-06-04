import { IsString, Length, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string; // роль которую хотим добавить
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number; // id пользователя которому мы эту роль будем добавлять
}
