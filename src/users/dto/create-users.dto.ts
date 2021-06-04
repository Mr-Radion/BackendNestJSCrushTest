import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';
// в параметры сервиса входит DTO объект, который не содержит никакой логики и имеет только поля,
// DTO используется для передачи данных клиент-сервер или сервер-сервер
// эти объекты предназначены для обмена данными, между какими-то подсистемами, например клиент-сервер
export class CreateUsersDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' }) // по рег выраж будет проверять, является ли допустимым emailом
  readonly email: string; // readonly - это поля в ts, которые нельзя перезаписать
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' }) // проверяет максимальную длину данных (мин, макс, сообщение при не соответствии)
  readonly password: string;
  // пояснить почему мы сюда не добавили пункт роли? мб берем ее отдельно для ответа склеивая два запроса в бд?
}
