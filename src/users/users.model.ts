import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

/* ВАЖНО ЕСЛИ НЕ НАПИСАТЬ ЗАРАНЕЕ МИГРАЦИЮ ДЛЯ ТАБЛИЦ, ТО ПОТОМ НЕЛЬЗЯ ИЗМЕНИТЬ В СУЩЕСТВУЮЩЕЙ ТИП ДАННЫХ, ПРИДЕТСЯ УДАЛЯТЬ И ЗАНОВО 
СОЗДАВАТЬ, ПОЭТОМУ ЕЕ НАДО СОЗДАВАТЬ ЗАРАНЕЕ  */

// тут содержатся поля обязательные для заполнения (пользователем) для класса
// остальные поля для создани объекта нам не нужны
interface UserCreationAttrs {
  email: string;
  password: string;
}

// чтобы сделать данный класс таблицей в бд указываем декоратор @Table и внутри название таблицы
// как первый generic указываем сам класс <User>, второй generic интерфейс с обязательными полями для заполнения пользователем
// <User, UserCreationAttrs>
@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
  // внутри описываем поля таблицы user из бд
  // для того, чтобы эти поля стали колонками в таблице используем декоратор @Column и передаем опции
  // первое для id
  // где unique: true - не добавляются одинаковые значения, autoIncrement - автоматически происходит увеличение индекса с каждой новой записью
  // primaryKey первичный ключ, по сути в таблице 1 такой.. ? по которому могут совершаться операци, т.е указывать на уник знач
  // type: DataType.INTEGER - тип поля
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  // allowNull: false означает, что email не может быть пустым, это обязательное поле для заполнения (при создании) но не имеет какого-то
  // дефолтного значения, как в случае с defaultValue: false
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  // также админы смогут банить пользователей, поэтому добавим флаг, который обозначит забанен пользователь или нет
  // defaultValue: false - это дефолтное значение поля, которое появляется при создании само, в данном случае по умолчанию user не забанен
  @ApiProperty({ example: 'true', description: 'Забанен или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  // след поле это причина бана
  // allowNull: true - означает, что поле с причиной бана может быть пустым
  // по хорошему поля с баном пользователя, лучше выносить в отдельную таблицу и показывать только если user забанен, но не усложняем пока
  // В бэке для начинающих есть пример объединения в ответе разных полей, то же поле info которое добавили в общую модель
  @ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
  // используем HasMany т.к 1 пользователь может иметь несколько разных постов
  @HasMany(() => Post)
  posts: Post[];
}
