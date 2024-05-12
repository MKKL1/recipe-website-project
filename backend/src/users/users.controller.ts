import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { GetUser } from './decorators/getuser.decorator';
import { User } from './schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new SerializeInterceptor<UserDto>(UserDto))
  @ApiOperation({ summary: 'Get current user info' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User info',
    type: UserDto,
  })
  async find(@GetUser() user: User) {
    return user;
  }
}
