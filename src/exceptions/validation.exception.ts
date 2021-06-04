import { HttpException, HttpStatus } from '@nestjs/common';
// в этой папке создаем кастомные ошибки (обработчики ошибок и исключений)
export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
