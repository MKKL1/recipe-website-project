import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/schemas/users.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { AuthResponse } from './dto/auth.response';

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

  async loginByDocument(userDoc: UserDocument): Promise<AuthResponse> {
    const payload = { sub: userDoc._id, username: userDoc.username };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    //   user: new UserDto(userDocument._id, ),
    // };
    // providing full info about user
    return new AuthResponse(
      await this.jwtService.signAsync(payload),
      new UserDto(
        userDoc._id.toHexString(),
        userDoc.username,
        userDoc.email,
        userDoc.roles,
      ),
    );
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
