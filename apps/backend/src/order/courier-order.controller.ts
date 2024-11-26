import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { OrderDto, OrderId } from '../types/dtos/order.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';

@ApiTags('courier/order')
@Controller('courier/order')
@JwtAuth()
@Roles(Role.ADMIN, Role.COURIER)
export class CourierOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllPendingOrders(): Promise<OrderDto[]> {
    return this.orderService.getAllPendingOrders();
  }

  @Post()
  async acceptOrder(@CurrentUser() user: UserDto, @Body() order: OrderId): Promise<OrderDto> {
    return this.orderService.acceptOrder(user.id, order.orderId);
  }
}
