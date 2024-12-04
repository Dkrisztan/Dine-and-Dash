import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, RestaurantDto, UpdateRestaurantDto } from '../types/dtos/restaurant.dto';
import { JwtAuth, JwtOptionalAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @JwtAuth()
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.COURIER)
  async createForCurrentUser(
    @CurrentUser() user: UserDto,
    @Body() createRestaurantDto: CreateRestaurantDto
  ): Promise<RestaurantDto> {
    return this.restaurantService.create(user.id, createRestaurantDto);
  }

  @Get()
  @UseGuards(JwtOptionalAuthGuard)
  async findAll(): Promise<RestaurantDto[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtOptionalAuthGuard)
  async findOne(@Param('id') id: string): Promise<RestaurantDto> {
    return this.restaurantService.findOne(id);
  }

  @Patch()
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER)
  async updateOwnRestaurant(
    @CurrentUser() user: UserDto,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ): Promise<RestaurantDto> {
    return this.restaurantService.updateSelf(user.id, updateRestaurantDto);
  }

  @Delete()
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER)
  async removeOwnRestaurant(@CurrentUser() user: UserDto): Promise<RestaurantDto> {
    return this.restaurantService.remove(user.id);
  }
}
