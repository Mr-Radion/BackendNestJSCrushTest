import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

// у pipe два предназначения
// 1. Преобразование одного типа данных скажем строки в другое скажем число
// 2. Валидация входных данных (проверка соответствия типов данных и вероятно кол-ва данных)
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // получаем объект, который будем валидировать, т.е тело запроса
    const obj = plainToClass(metadata.metatype, value); // и plainToClass преобразует значение в нужный для нас класс
    const errors = await validate(obj);

    if (errors.length) {
      // если мы попали в данный блок, значит уже есть ошибки, либо неправильная длина пароля, либо сам email
      const messages = errors.map(err => {
        // в поле err.constraints сообщения об ошибке, которые мы указывали в dto, т.к их может быть несколько, мы склеиваем их в строку
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`; // .property - название поля, email или password
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
