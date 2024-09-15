import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { OrderDto } from '../types/dtos/order.dto';

@Controller('order')
@JwtAuth()
@Roles(Role.ADMIN, Role.CUSTOMER, Role.OWNER, Role.COURIER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrderFromCart(@CurrentUser() user: UserDto): Promise<OrderDto> {
    return this.orderService.createOrderFromCart(user);
  }
}
