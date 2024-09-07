import { FoodDto } from './food.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CartDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  userId: string;

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

  @ApiProperty({ example: 1500 })
  total: number;
}

export class CreateCartDto extends OmitType(CartDto, ['id']) {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsOptional()
  total: number;

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
  @IsOptional()
  @IsArray()
  items: FoodDto[];
}
