import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminUpdateUserDto, CreateUserDto, UserDto } from '../types/dtos/user.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/user')
@Controller('admin/user')
@JwtAuth()
@Roles(Role.ADMIN)
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: AdminUpdateUserDto): Promise<UserDto> {
    return this.userService.updateByAdmin(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    return this.userService.remove(id);
  }
}
