import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FoodDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: 'Pizza' })
  name: string;

  @ApiProperty({ example: 'Delicious pizza' })
  description: string;

  @ApiProperty({ example: 1500 })
  price: number;

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  image: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  restaurantId: string;
}

export class CreateFoodDto extends OmitType(FoodDto, ['id']) {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Delicious pizza' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;
}

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Delicious pizza' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  @IsString()
  @IsOptional()
  image: string;
}
