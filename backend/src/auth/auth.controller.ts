import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to created account' })
  @ApiOkResponse({
    description: 'Jwt token',
    type: JwtPayloadDto,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new account' })
  @ApiOkResponse({
    description: 'Jwt token',
    type: JwtPayloadDto,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
