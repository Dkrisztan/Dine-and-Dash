import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { RestaurantTag } from './restaurant-tag.dto';

export class RatingDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  userId: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  restaurantId: string;

  @ApiProperty({ example: 4.5 })
  score: number;
}

export class CreateRatingDto extends OmitType(RatingDto, ['userId', 'restaurantId']) {
  @ApiProperty({ example: 4.5 })
  @IsNotEmpty()
  score: number;
}

export class RestaurantDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: 'Pizza Place' })
  name: string;

  @ApiProperty({ example: 'The best pizza place in town' })
  description: string;

  @ApiProperty({ example: ['Bp utca 1.'] })
  addresses: string[];

  @ApiProperty({ type: RatingDto, isArray: true })
  ratings: RatingDto[];

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  ownerId: string;

  @ApiProperty({ example: [RestaurantTag.STREET, RestaurantTag.KEBAB], enum: RestaurantTag, isArray: true })
  tags: RestaurantTag[];

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  image: string;
}

export class CreateRestaurantDto extends OmitType(RestaurantDto, ['id', 'ownerId', 'ratings']) {
  @ApiProperty({ example: 'Pizza Place' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'The best pizza place in town' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: ['Bp utca 1.'] })
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  addresses: string[];

  @ApiProperty({ example: [RestaurantTag.STREET, RestaurantTag.KEBAB], enum: RestaurantTag, isArray: true })
  @IsArray()
  @IsNotEmpty()
  tags: RestaurantTag[];

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiProperty({ example: 'Pizza Place' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'The best pizza place in town' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: ['Bp utca 1.'] })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  addresses: string[];

  @ApiProperty({ example: [RestaurantTag.STREET, RestaurantTag.KEBAB], enum: RestaurantTag, isArray: true })
  @IsArray()
  @IsOptional()
  tags: RestaurantTag[];

  @ApiProperty({ example: 'https://www.example.com/pizza.jpg' })
  @IsString()
  @IsOptional()
  image: string;
}
