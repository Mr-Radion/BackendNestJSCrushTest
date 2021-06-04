export class AddRoleDto {
  readonly value: string; // роль которую хотим добавить
  readonly userId: number; // id пользователя которому мы эту роль будем добавлять
}
