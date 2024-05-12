import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/schemas/users.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return this.loginByDocument(user);
  }

  async loginByDocument(userDocument: UserDocument) {
    const payload = { sub: userDocument._id, username: userDocument.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return this.loginByDocument(user);
  }

  async validateUser(jwtPayload: any): Promise<any> {
    const user = await this.usersService.findById(jwtPayload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }
}
