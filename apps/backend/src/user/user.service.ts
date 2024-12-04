import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AdminUpdateUserDto, CreateUserDto, UpdateUserDto, UserDto } from '../types/dtos/user.dto';
import { PrismaService } from 'nestjs-prisma';
import { OrderDto } from '../types/dtos/order.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.prisma.user.create({ data: createUserDto, include: { ratings: true } });
      Logger.debug(`Created user with id: ${user.id}`, UserService.name);
      await this.prisma.cart.create({ data: { user: { connect: { id: user.id } } } });
      return user;
    } catch (error) {
      Logger.error(`Error creating user: ${error.message}`);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      include: {
        ownerOf: {
          include: {
            ratings: true,
          },
        },
        cart: true,
        ratings: true,
      },
    });
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ownerOf: {
          include: {
            ratings: true,
          },
        },
        cart: true,
        ratings: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user = this.prisma.user.update({ where: { id }, data: updateUserDto, include: { ratings: true } });
      Logger.debug(`Updated user with id: ${id}`, UserService.name);
      return user;
    } catch (error) {
      Logger.error(`Error updating user: ${error.message}`);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async updateByAdmin(id: string, updateUserDto: AdminUpdateUserDto): Promise<UserDto> {
    try {
      const user = this.prisma.user.update({ where: { id }, data: updateUserDto, include: { ratings: true } });
      Logger.debug(`Updated user with id: ${id}`, UserService.name);
      return user;
    } catch (error) {
      Logger.error(`Error updating user: ${error.message}`);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: string): Promise<UserDto> {
    return this.prisma.user.delete({ where: { id }, include: { ratings: true } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }, include: { ownerOf: true, cart: true } });
  }

  async getOrdersOfUser(userId: string): Promise<OrderDto[]> {
    return this.prisma.order.findMany({ where: { userId }, include: { items: { include: { food: true } } } });
  }

  async becomeCourier(userId: string): Promise<UserDto> {
    return this.prisma.user.update({ where: { id: userId }, data: { role: 'COURIER' }, include: { ratings: true } });
  }
}
