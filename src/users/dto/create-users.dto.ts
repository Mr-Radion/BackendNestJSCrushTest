import { ApiProperty } from '@nestjs/swagger';
// в параметры сервиса входит DTO объект, который не содержит никакой логики и имеет только поля,
// DTO используется для передачи данных клиент-сервер или сервер-сервер
// эти объекты предназначены для обмена данными, между какими-то подсистемами, например клиент-сервер
export class CreateUsersDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  readonly email: string; // readonly - это поля в ts, которые нельзя перезаписать
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  readonly password: string;
  // пояснить почему мы сюда не добавили пункт роли? мб берем ее отдельно для ответа склеивая два запроса в бд?
}
