import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { OrderDto } from '../types/dtos/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/order')
@Controller('admin/order')
@JwtAuth()
@Roles(Role.ADMIN)
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async findAllForUser(@Param('id') userId: string): Promise<OrderDto[]> {
    return this.orderService.findAllForUser(userId);
  }

  @Get()
  async findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }
}
