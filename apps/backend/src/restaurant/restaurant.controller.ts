import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  CreateRatingDto,
  CreateRestaurantDto,
  RatingDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from '../types/dtos/restaurant.dto';
import { JwtAuth, JwtOptionalAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { ApiTags } from '@nestjs/swagger';
import { OrderDto, OrderStatusDto } from '../types/dtos/order.dto';

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

  @Post(':id/rate')
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER, Role.COURIER, Role.CUSTOMER)
  async rate(
    @CurrentUser() user: UserDto,
    @Param('id') id: string,
    @Body() rating: CreateRatingDto
  ): Promise<RatingDto> {
    return this.restaurantService.rate(id, user.id, rating.score);
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

  @Get('restaurant/orders')
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER)
  async getRestaurantOrders(@CurrentUser() user: UserDto): Promise<OrderDto[]> {
    return this.restaurantService.getRestaurantOrders(user.id);
  }

  @Patch('restaurant/orders/:orderId')
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER)
  async updateRestaurantOrder(
    @CurrentUser() user: UserDto,
    @Param('orderId') orderId: string,
    @Body() orderStatus: OrderStatusDto
  ): Promise<OrderDto> {
    return this.restaurantService.updateRestaurantOrder(user.id, orderId, orderStatus);
  }

  @Delete()
  @JwtAuth()
  @Roles(Role.ADMIN, Role.OWNER)
  async removeOwnRestaurant(@CurrentUser() user: UserDto): Promise<RestaurantDto> {
    return this.restaurantService.remove(user.id);
  }
}
