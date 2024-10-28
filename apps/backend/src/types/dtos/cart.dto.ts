import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FoodDto } from './food.dto';

export class CartItemDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  foodId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  cartId: string;

  @ApiProperty({
    example: {
      id: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
      name: 'Chicken Burger',
      price: 1500,
      description: 'A delicious chicken burger.',
      image: 'https://source.unsplash.com/200x200/?burger',
      restaurantId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
    },
  })
  food: FoodDto;
}

export class CartDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  userId: string;

  @ApiProperty({ example: 1500 })
  total: number;

  @ApiProperty({
    example: [
      {
        id: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
        foodId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
        cartId: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a',
      },
    ],
  })
  items?: CartItemDto[];
}

export class CreateCartDto extends OmitType(CartDto, ['id', 'total', 'items']) {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class AddToCartDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  foodId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class RemoveFromCartDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  @IsString()
  @IsNotEmpty()
  foodId: string;
}
