import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from '../types/dtos/user.dto';
import { JwtAuth } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../types/dtos/role.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
@JwtAuth()
@Roles(Role.ADMIN, Role.CUSTOMER, Role.COURIER, Role.OWNER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async me(@CurrentUser() user: UserDto): Promise<UserDto> {
    return this.userService.findOne(user.id);
  }

  @Patch('me')
  async updateProfile(@CurrentUser() user: UserDto, @Body() updateDto: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(user.id, updateDto);
  }

  @Delete('me')
  async deleteProfile(@CurrentUser() user: UserDto): Promise<UserDto> {
    return this.userService.remove(user.id);
  }
}
