import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, RestaurantDto, UpdateRestaurantDto } from '../types/dtos/restaurant.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/restaurant')
@Controller('admin/restaurant')
@JwtAuth()
@Roles(Role.ADMIN)
export class AdminRestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createForUser(userId: string, @Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.create(userId, createRestaurantDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RestaurantDto> {
    return this.restaurantService.remove(id);
  }
}
