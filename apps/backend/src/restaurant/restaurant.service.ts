import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto, RestaurantDto, UpdateRestaurantDto } from '../types/dtos/restaurant.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    try {
      const { ownerId, ...rest } = createRestaurantDto;
      const restaurant = await this.prisma.restaurant.create({
        data: {
          ...rest,
          owner: {
            connect: { id: ownerId },
          },
        },
      });
      Logger.debug(`Created restaurant with id: ${restaurant.id}`, RestaurantService.name);
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

  async remove(id: string): Promise<RestaurantDto> {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
