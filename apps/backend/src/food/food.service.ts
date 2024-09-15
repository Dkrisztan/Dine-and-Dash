import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFoodDto, FoodDto } from '../types/dtos/food.dto';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, createFoodDto: CreateFoodDto): Promise<FoodDto> {
    try {
      const food = await this.prisma.food.create({
        data: {
          ...createFoodDto,
          restaurant: {
            connect: {
              id,
            },
          },
        },
      });
      Logger.debug(`Food created: ${food.id} for restauran: ${id}`, FoodService.name);
      return food;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllForRestaurant(id: string): Promise<FoodDto[]> {
    return this.prisma.food.findMany({ where: { restaurantId: id } });
  }

  async findAll(): Promise<FoodDto[]> {
    return this.prisma.food.findMany();
  }

  async findOneForRestaurant(restaurantId: string, foodId: string): Promise<FoodDto> {
    const food = await this.prisma.food.findUnique({ where: { id: foodId, restaurantId } });
    if (!food) {
      throw new NotFoundException(`Food with id: ${foodId} not found`);
    }
    return food;
  }

  async findOne(foodId: string): Promise<FoodDto> {
    const food = await this.prisma.food.findUnique({ where: { id: foodId } });
    if (!food) {
      throw new NotFoundException(`Food with id: ${foodId} not found`);
    }
    return food;
  }

  async updateOneForRestaurant(restaurantId: string, foodId: string, updateFoodDto: CreateFoodDto): Promise<FoodDto> {
    const food = await this.prisma.food.update({
      where: { id: foodId, restaurantId },
      data: updateFoodDto,
    });
    if (!food) {
      throw new NotFoundException(`Food with id: ${foodId} not found`);
    }
    Logger.debug(`Food updated: ${food.id} for restaurant: ${restaurantId}`, FoodService.name);
    return food;
  }

  async update(foodId: string, updateFoodDto: CreateFoodDto): Promise<FoodDto> {
    const food = await this.prisma.food.update({
      where: { id: foodId },
      data: updateFoodDto,
    });
    if (!food) {
      throw new NotFoundException(`Food with id: ${foodId} not found`);
    }
    Logger.debug(`Food updated: ${food.id}`, FoodService.name);
    return food;
  }

  async removeFromRestaurant(restaurantId: string, foodId: string): Promise<FoodDto> {
    return this.prisma.food.delete({ where: { id: foodId, restaurantId } });
  }

  async remove(foodId: string): Promise<FoodDto> {
    return this.prisma.food.delete({ where: { id: foodId } });
  }
}
