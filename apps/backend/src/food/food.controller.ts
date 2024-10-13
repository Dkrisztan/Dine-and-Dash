import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, FoodDto, UpdateFoodDto } from '../types/dtos/food.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('food')
@Controller('food')
@JwtAuth()
@Roles(Role.ADMIN, Role.OWNER)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFoodToCurrentUserRestaurant(
    @CurrentUser() user: UserDto,
    @Body() createFoodDto: CreateFoodDto
  ): Promise<FoodDto> {
    return this.foodService.create(user.ownerOf.id, createFoodDto);
  }

  @Get()
  async findAllForRestaurant(@CurrentUser() user: UserDto): Promise<FoodDto[]> {
    return this.foodService.findAllForRestaurant(user.ownerOf.id);
  }

  @Get(':id')
  async findOneForRestaurant(@CurrentUser() user: UserDto, @Param('id') id: string): Promise<FoodDto> {
    return this.foodService.findOneForRestaurant(user.ownerOf.id, id);
  }

  @Patch(':id')
  async updateOneForRestaurant(
    @CurrentUser() user: UserDto,
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto
  ): Promise<FoodDto> {
    return this.foodService.updateOneForRestaurant(user.ownerOf.id, id, updateFoodDto);
  }

  @Delete(':id')
  async removeFromRestaurant(@CurrentUser() user: UserDto, @Param('id') id: string): Promise<FoodDto> {
    return this.foodService.removeFromRestaurant(user.ownerOf.id, id);
  }
}
