import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    // const passwordHash = await bcrypt.hash(password, 10);
    // console.log('password ' + password + ' hash: ' + passwordHash);
    const user = await this.usersService.findOne(username);

    // const isMatch = await bcrypt.compare(user?.password, passwordHash);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
