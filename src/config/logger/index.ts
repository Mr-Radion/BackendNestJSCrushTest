/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(_message: string) {}
  error(_message: string, trace: string) {}
  warn(_message: string) {}
  debug(_message: string) {}
  verbose(_message: string) {}
}
