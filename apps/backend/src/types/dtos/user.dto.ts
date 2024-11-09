import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { RestaurantDto } from './restaurant.dto';
import { CartDto } from './cart.dto';
import { Role } from './role.dto';

export class UserDto {
  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  email: string;

  @ApiProperty({ example: '+3620111222' })
  phone: string;

  @ApiProperty({ example: ['1010 Budapest, Kossuth Lajos utca 1.'] })
  addresses: string[];

  @ApiProperty({ example: Role.CUSTOMER, enum: Role })
  role: 'ADMIN' | 'CUSTOMER' | 'COURIER' | 'OWNER';

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  ownerOf?: RestaurantDto;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  image: string;

  @ApiProperty({ example: '1e9b39c7-7a10-4bd7-ba03-b89f78887e4a' })
  cart?: CartDto;
}

export class CreateUserDto extends OmitType(UserDto, ['id', 'ownerOf', 'cart', 'role', 'phone']) {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: ['1010 Budapest, Kossuth Lajos utca 1.'] })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  addresses: string[];

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '+3620111222' })
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ example: ['1010 Budapest, Kossuth Lajos utca 1.'] })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  addresses: string[];

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsOptional()
  image: string;
}
