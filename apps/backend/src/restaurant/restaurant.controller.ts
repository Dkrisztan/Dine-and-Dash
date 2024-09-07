import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, RestaurantDto, UpdateRestaurantDto } from '../types/dtos/restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  async findAll(): Promise<RestaurantDto[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RestaurantDto> {
    return this.restaurantService.findOne(id);
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
