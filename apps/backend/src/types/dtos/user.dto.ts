import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

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
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+3620111222' })
  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  phone: string;

  @ApiProperty({ example: ['1010 Budapest, Kossuth Lajos utca 1.'] })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  addresses: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'johndoe@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '+3620111222' })
  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ example: ['1010 Budapest, Kossuth Lajos utca 1.'] })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  addresses: string[];
}
