import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Schema, Types} from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import {UserDto} from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import {UserUpdateDto} from "./dto/user-update.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findByUsername(username: string) {
        return this.userModel.findOne({ username: username }).exec();
    }

    async findById(id: string) {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async create(createUserDto: CreateUserDto) {
        return new this.userModel(createUserDto).save();
    }

    async update(user: User, userUpdateDTO: UserUpdateDto){
        user.username = userUpdateDTO.username;
        user.email = userUpdateDTO.email;

        return this.userModel.findOneAndUpdate(
            {_id: user._id},
            {$set: user},
            {new: true}
        ).exec();
    }

    // async updatePassword(id: string, passwordDTO: PasswordDto){
    //     const user = await this.userModel.findById(id).exec();
    //
    //     // don't work
    //     if(await bcrypt.compare(passwordDTO.oldPassword, user.password)){
    //       throw new UnauthorizedException();
    //     }
    //
    //     user.password = passwordDTO.newPassword;
    //     return await this.userModel.updateOne(
    //         {_id: id},
    //         {$set: user},
    //         {new: true}
    //     ).exec();
    // }

    async delete(id: Types.ObjectId): Promise<User>{
        return await this.userModel.findOneAndDelete({_id: id}).exec();
    }
}
