import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, FoodDto, UpdateFoodDto } from '../types/dtos/food.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';

@Controller('admin/food')
@JwtAuth()
@Roles(Role.ADMIN)
export class AdminFoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFoodToCurrentUserRestaurant(restaurantId: string, @Body() createFoodDto: CreateFoodDto): Promise<FoodDto> {
    return this.foodService.create(restaurantId, createFoodDto);
  }

  @Get()
  async findAll(): Promise<FoodDto[]> {
    return this.foodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FoodDto> {
    return this.foodService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto): Promise<FoodDto> {
    return this.foodService.update(id, updateFoodDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<FoodDto> {
    return this.foodService.remove(id);
  }
}
