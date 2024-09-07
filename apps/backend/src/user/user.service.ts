import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../types/dtos/user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      Logger.debug(`Created user with id: ${user.id}`, UserService.name);
      return user;
    } catch (error) {
      Logger.error(`Error creating user: ${error.message}`);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user = this.prisma.user.update({ where: { id }, data: updateUserDto });
      Logger.debug(`Updated user with id: ${id}`, UserService.name);
      return user;
    } catch (error) {
      Logger.error(`Error updating user: ${error.message}`);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: string): Promise<UserDto> {
    return this.prisma.user.delete({ where: { id } });
  }
}
