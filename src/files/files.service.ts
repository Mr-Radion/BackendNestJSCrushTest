import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'; // импортируем из nodejs модуль для работы с путями
import * as fs from 'fs'; // импортируем стандартный модуль для работы с файлами в nodejs
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    // работу с файлом лучше делать асинхронной
    try {
      const fileName = uuid.v4() + '.jpg'; // если бы мы незнали четко названия расширения файла, то мы бы получали его из исходного файла
      const filePath = path.resolve(__dirname, '..', 'static'); // сохранит в деплой версии в папке dist
      // если по указанному пути ничего не существует
      if (!fs.existsSync(filePath)) {
        // то мы создаем папку
        fs.mkdirSync(filePath, { recursive: true }); // 2 параметр recursive true т.е если папки по пути не будет, nodejs создаст ее
      }
      // если папка существует, то мы записываем в нее файл, склеивая путь с названием файла
      fs.writeFileSync(path.join(filePath, fileName), file.buffer); // 2 параметром передали буфер, который из файла достаем
      // по итогу файл запишется в файловую систему и из этой функции мы возвращаем название файла
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
