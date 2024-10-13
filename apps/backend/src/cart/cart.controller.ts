import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, CartDto } from '../types/dtos/cart.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Role } from '../types/dtos/role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../types/dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
@JwtAuth()
@Roles(Role.ADMIN, Role.CUSTOMER, Role.OWNER, Role.COURIER)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@CurrentUser() user: UserDto): Promise<CartDto> {
    return this.cartService.getCartByUserId(user.id);
  }

  @Post()
  async addToCart(@CurrentUser() user: UserDto, @Body() cartItem: AddToCartDto): Promise<CartDto> {
    return this.cartService.addToCart(user, cartItem);
  }

  @Delete(':id')
  async removeFromCart(@CurrentUser() user: UserDto, @Param('id') foodId: string): Promise<CartDto> {
    return this.cartService.removeFromCart(user, foodId);
  }
}
