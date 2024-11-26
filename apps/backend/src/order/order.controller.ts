import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { DeliveryDto, OrderDto } from '../types/dtos/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
@JwtAuth()
@Roles(Role.ADMIN, Role.CUSTOMER, Role.OWNER, Role.COURIER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrderFromCart(@CurrentUser() user: UserDto, @Body() address: DeliveryDto): Promise<OrderDto> {
    return this.orderService.createOrderFromCart(user, address.deliveryTo);
  }

  @Get()
  async findAllForCurrentUser(@CurrentUser() user: UserDto): Promise<OrderDto[]> {
    return this.orderService.findAllForUser(user.id);
  }
}
