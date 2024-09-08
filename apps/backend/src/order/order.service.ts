import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderDto } from '../types/dtos/order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    try {
      const { userId, restaurantId, total, ...rest } = createOrderDto;
      const order = await this.prisma.order.create({
        data: {
          ...rest,
          total: parseFloat(total.toString()),
          items: {
            connect: createOrderDto.items.map((item) => ({ id: item.id })),
          },
          user: {
            connect: { id: userId },
          },
          restaurant: {
            connect: { id: restaurantId },
          },
        },
      });
      Logger.debug(`Created order with id: ${order.id}`, OrderService.name);
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Error creating order' + error.message);
    }
  }

  async findAll(): Promise<OrderDto[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: string): Promise<OrderDto> {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDto> {
  //   try {
  //     const order = this.prisma.order.update({ where: { id }, data: updateOrderDto });
  //     Logger.debug(`Updated order with id: ${id}`, OrderService.name);
  //     return order;
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException('Error updating order');
  //   }
  // }

  async remove(id: string): Promise<OrderDto> {
    return this.prisma.order.delete({ where: { id } });
  }
}
