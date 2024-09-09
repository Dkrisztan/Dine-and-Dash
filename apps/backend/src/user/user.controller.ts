import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from '../types/dtos/user.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('user')
@JwtAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.COURIER, Role.OWNER)
  async me(@CurrentUser() user: UserDto): Promise<UserDto> {
    return this.userService.findOne(user.id);
  }

  @Patch('me')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.COURIER, Role.OWNER)
  async updateProfile(@CurrentUser() user: UserDto, updateDto: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(user.id, updateDto);
  }

  @Delete('me')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.COURIER, Role.OWNER)
  async deleteProfile(@CurrentUser() user: UserDto): Promise<UserDto> {
    return this.userService.remove(user.id);
  }
}
