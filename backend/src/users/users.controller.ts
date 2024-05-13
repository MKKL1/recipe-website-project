import {Body, Controller, Delete, Get, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { GetUser } from './decorators/getuser.decorator';
import { User } from './schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import {UserUpdateDto} from "./dto/user-update.dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

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

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new SerializeInterceptor<UserDto>(UserDto))
  async updateUser(@GetUser() user: User, @Body() userUpdateDTO: UserUpdateDto){
    return this.usersService.update(user, userUpdateDTO);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@GetUser() user: User){
    return this.usersService.delete(user._id);
  }
}
