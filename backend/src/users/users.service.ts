import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }

  async create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }
}
