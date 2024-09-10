import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto, RestaurantDto, UpdateRestaurantDto } from '../types/dtos/restaurant.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    try {
      const restaurant = await this.prisma.restaurant.create({
        data: {
          ...createRestaurantDto,
          owner: {
            connect: { id },
          },
        },
      });

      Logger.debug(`Created restaurant with id: ${restaurant.id}`, RestaurantService.name);

      await this.prisma.user.update({
        where: { id },
        data: {
          role: {
            set: 'OWNER',
          },
        },
      });

      Logger.debug(`Updated user with id: ${id} to OWNER role`, RestaurantService.name);

      return restaurant;
    } catch (error) {
      throw new InternalServerErrorException('Error creating restaurant');
    }
  }

  async findAll(): Promise<RestaurantDto[]> {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: string): Promise<RestaurantDto> {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto> {
    try {
      const restaurant = this.prisma.restaurant.update({ where: { id }, data: updateRestaurantDto });
      Logger.debug(`Updated restaurant with id: ${id}`, RestaurantService.name);
      return restaurant;
    } catch (error) {
      Logger.error(`Error updating restaurant: ${error.message}`);
      throw new InternalServerErrorException('Error updating restaurant');
    }
  }

  async updateSelf(userId: string, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto> {
    const { id } = await this.prisma.restaurant.findFirst({ where: { ownerId: userId } });
    if (!id) {
      throw new NotFoundException(`Restaurant for user with id ${userId} not found`);
    } else {
      return this.update(id, updateRestaurantDto);
    }
  }

  async remove(id: string): Promise<RestaurantDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const { role } = user;

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else if (role !== 'OWNER') {
      throw new ForbiddenException('You do not own any restaurant!');
    }
    const resturantDeleted = this.prisma.restaurant.delete({ where: { ownerId: id } });

    await this.prisma.user.update({
      where: { id },
      data: {
        role: {
          set: 'CUSTOMER',
        },
      },
    });

    return resturantDeleted;
  }
}
