import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AddToCartDto, CartDto } from '../types/dtos/cart.dto';
import { UserDto } from '../types/dtos/user.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCarts(): Promise<CartDto[]> {
    return this.prisma.cart.findMany({ include: { items: true } });
  }

  async getCartById(id: string): Promise<CartDto> {
    const cart = await this.prisma.cart.findFirst({
      where: { id },
      include: { items: true },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async getCartByUserId(userId: string): Promise<CartDto> {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  async addToCart(user: UserDto, cartItem: AddToCartDto): Promise<CartDto> {
    for (let i = 0; i < cartItem.quantity; i++) {
      await this.prisma.cartItem.create({
        data: {
          foodId: cartItem.foodId,
          cartId: user.cart.id,
        },
      });
    }

    return this.upDateCartTotal(user.cart.id);
  }

  async removeFromCart(user: UserDto, foodId: string): Promise<CartDto> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { foodId, cartId: user.cart.id },
    });

    if (!cartItem) {
      throw new Error('Item not found in cart');
    }

    await this.prisma.cartItem.delete({ where: { id: cartItem.id } });

    return this.upDateCartTotal(user.cart.id);
  }

  async upDateCartTotal(cartId: string): Promise<CartDto> {
    const itemsInCart = await this.prisma.cartItem.findMany({
      where: { cartId: cartId },
      include: { food: true },
    });

    const total = itemsInCart.map((item) => item.food.price).reduce((acc, curr) => acc + curr, 0);
    return this.prisma.cart.update({
      where: { id: cartId },
      data: { total },
    });
  }
}
