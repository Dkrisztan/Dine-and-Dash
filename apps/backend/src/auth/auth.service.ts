import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateOAuthUser(profile: { email: string; name: string; image: string }) {
    const { email, name, image } = profile;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      return await this.userService.create({
        email,
        name,
        image,
        addresses: [''],
        phone: '',
      });
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
