import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RestaurantDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: 'Pizza Place' })
  name: string;

  @ApiProperty({ example: 'The best pizza place in town' })
  description: string;

  @ApiProperty({ example: ['Bp utca 1.'] })
  addresses: string[];

  @ApiProperty({ example: 4.5 })
  rating: number[];

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  ownerId: string;
}

export class CreateRestaurantDto extends OmitType(RestaurantDto, ['id', 'ownerId']) {
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
}
