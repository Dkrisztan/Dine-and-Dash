import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { FoodDto } from './food.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  userId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  restaurantId: string;

  @ApiProperty({ example: ['1500'] })
  total: number;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  @ApiProperty({
    example: [
      {
        id: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
        name: 'Pizza',
        description: 'Delicious pizza',
        price: 1500,
        image: 'https://www.example.com/pizza.jpg',
        restaurantId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
      },
    ],
  })
  items: FoodDto[];

  @ApiProperty({ example: '2021-08-26T12:00:00.000Z' })
  createdAt: Date;
}

export class CreateOrderDto extends OmitType(OrderDto, ['id']) {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({ example: ['1500'] })
  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ example: 'PENDING' })
  @IsString()
  @IsOptional()
  status: string;
}
