import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

/* ВАЖНО ЕСЛИ НЕ НАПИСАТЬ ЗАРАНЕЕ МИГРАЦИЮ ДЛЯ ТАБЛИЦ, ТО ПОТОМ НЕЛЬЗЯ ИЗМЕНИТЬ В СУЩЕСТВУЮЩЕЙ ТИП ДАННЫХ, ПРИДЕТСЯ УДАЛЯТЬ И ЗАНОВО 
СОЗДАВАТЬ, ПОЭТОМУ ЕЕ НАДО СОЗДАВАТЬ ЗАРАНЕЕ  */

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({
  tableName: 'posts',
})
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  // добавляем внешний ключ
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // Указываем связи
  // обратную связь указали, что 1 пост принадлежит, конкретному пользователю,
  // тоесть одна и та же роль не может принадлежать нескольким пользователям
  @BelongsTo(() => User)
  author: User;
}
