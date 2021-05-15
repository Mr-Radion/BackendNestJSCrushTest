import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string; // тут название роли user, admin, manager
  description: string;
}

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  // в 1 параметре с какой сущностью мы связываем данный класс Role и вторым аргументом, через какую таблицу связь
  // ту же связь обозначить в классе с User, но указать там связь с данным классом Role
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
