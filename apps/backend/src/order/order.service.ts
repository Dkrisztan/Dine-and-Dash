import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserDto } from '../types/dtos/user.dto';
import { OrderDto } from '../types/dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderFromCart(user: UserDto, address: string): Promise<OrderDto> {
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
        deliveryTo: address,
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
        restaurant: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
            ratings: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<OrderDto[]> {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: string): Promise<OrderDto> {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async updateOrderStatus(id: string, paymentStatus: OrderDto['paymentStatus']): Promise<OrderDto> {
    return this.prisma.order.update({
      where: { id },
      data: { paymentStatus },
    });
  }

  async getAllPendingOrders(): Promise<OrderDto[]> {
    return this.prisma.order.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
        restaurant: {
          select: {
            name: true,
            description: true,
            image: true,
            addresses: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async acceptOrder(courierId: string, orderId: string): Promise<OrderDto> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERING',
        courier: {
          connect: {
            id: courierId,
          },
        },
      },
    });
  }

  async getMyDeliveries(courierId: string): Promise<OrderDto[]> {
    return this.prisma.order.findMany({
      where: {
        courierId,
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
        restaurant: {
          select: {
            name: true,
            description: true,
            image: true,
            addresses: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async finishOrder(id: string, orderId: string): Promise<OrderDto> {
    return this.prisma.order.update({
      where: { id: orderId, courierId: id },
      data: {
        status: 'FINISHED',
      },
    });
  }
}
