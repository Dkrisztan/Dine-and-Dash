import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './order-status.dto';

export class OrderItemDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  foodId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  orderId: string;
}

export class OrderDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  userId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  restaurantId: string;

  @ApiProperty({ example: ['1500'] })
  total: number;

  @ApiProperty({ example: OrderStatus.PENDING, enum: OrderStatus })
  status: 'PENDING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';

  @ApiProperty({ example: '2021-08-26T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({
    example: [
      {
        id: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
        foodId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
        orderId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
      },
    ],
  })
  items?: OrderItemDto[];
}
