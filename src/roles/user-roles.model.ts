import { User } from './../users/users.model';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './roles.model';

// 2 аргумента в generic Model<> нету, так как вручную мы никакие объекты сюда добавлять не будем,
// соответственно как и апи доки для них отсутствуют
@Table({
  tableName: 'user-roles',
  createdAt: false, // чтобы убрать из таблицы дану создания она здесь не нужна
  updatedAt: false, // чтобы убрать из таблицы дану обновления
})
export class UserRoles extends Model<UserRoles> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  // чтобы sequelize понимал, что это внешний id ключ, а не внутренний, как обычный id,
  // помечаем @ForeignKey указывая внутри на что внешний ключ ссылается
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
