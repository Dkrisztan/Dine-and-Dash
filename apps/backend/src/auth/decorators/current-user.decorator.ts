import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from '../../types/dtos/user.dto';

interface JwtUser extends UserDto {
  iat: number;
  exp: number;
}

type AnyUser = UserDto | JwtUser;

export const CurrentUser = createParamDecorator<keyof AnyUser | undefined>((key, context: ExecutionContext) => {
  const user: AnyUser = context.switchToHttp().getRequest().user;

  if (!user) {
    throw new InternalServerErrorException('CurrentUser decorator invoked without authGuard');
  }

  if (key && !user.hasOwnProperty(key)) {
    throw new InternalServerErrorException(`Unknown key ${key} in CurrentUser decorator`);
  }

  return key ? user[key] : user;
});
