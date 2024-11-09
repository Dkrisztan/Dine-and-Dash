import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserDto } from '../types/dtos/user.dto';
import { OrderDto } from '../types/dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderFromCart(user: UserDto): Promise<OrderDto> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: user.cart.id },
      include: { items: true },
    });

    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: user.cart.id,
      },
      select: {
        food: {
          select: {
            restaurantId: true,
          },
        },
      },
    });

    const [restaurantId] = cartItems.map((item) => item.food.restaurantId);

    const items = [];
    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        restaurantId: restaurantId,
        total: cart.total,
      },
    });

    for (const item of cart.items) {
      const newItem = await this.prisma.orderItem.create({
        data: {
          foodId: item.foodId,
          orderId: order.id,
        },
      });
      items.push(newItem);
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: user.cart.id,
      },
    });

    await this.prisma.cart.update({
      where: { id: user.cart.id },
      data: {
        total: 0,
      },
    });

    return {
      ...order,
      items,
    };
  }

  async findAllForUser(userId: string): Promise<OrderDto[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<OrderDto[]> {
    return this.prisma.order.findMany();
  }
}
