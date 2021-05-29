import { ApiProperty } from '@nestjs/swagger';
// в параметры сервиса входит DTO объект, который не содержит никакой логики и имеет только поля,

// эти объекты предназначены для обмена данными, между какими-то подсистемами, например клиент-сервер
export class CreateUsersDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  readonly email: string; // readonly - это поля в ts, которые нельзя перезаписать
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;
}
