import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FoodDto } from './food.dto';

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
  status: 'PENDING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';

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

  @IsNotEmpty()
  @IsArray()
  items: FoodDto[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
