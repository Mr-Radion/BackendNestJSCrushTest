import { Role } from './roles.model';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private userRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.userRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.userRepository.findOne({ where: { value } });
    return role;
  }
}
