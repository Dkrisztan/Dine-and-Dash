import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from '../types/dtos/cart.dto';
import { Role } from '../types/dtos/role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/cart')
@Controller('admin/cart')
@Roles(Role.ADMIN)
@JwtAuth()
export class AdminCartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getAllCarts(): Promise<CartDto[]> {
    return this.cartService.getAllCarts();
  }

  @Get(':id')
  async getCartById(@Param('id') id: string): Promise<CartDto> {
    return this.cartService.getCartById(id);
  }
}
