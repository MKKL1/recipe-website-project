import {Body, Controller, Delete, Get, Patch, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { GetUser } from './decorators/getuser.decorator';
import { User } from './schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import {UserUpdateDto} from "./dto/user-update.dto";
import {UsersService} from "./users.service";
import {PasswordDto} from "./dto/password-dto";

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
  @ApiOperation({summary: 'Change email or username of actual user'})
  async updateUser(@GetUser() user: User, @Body() userUpdateDTO: UserUpdateDto){
    return this.usersService.update(user, userUpdateDTO);
  }

  @Patch('password')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({summary: "Replace old user's password with new one"})
  async updatePassword(@GetUser() user: User, @Body() passwordDTO: PasswordDto){
    return this.usersService.updatePassword(user, passwordDTO);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({summary: 'Permanently delete user'})
  async deleteUser(@GetUser() user: User){
    return this.usersService.delete(user._id);
  }
}
