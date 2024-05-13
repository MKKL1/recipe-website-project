import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {UserUpdateDto} from "./dto/user-update.dto";
import {PasswordDto} from "./dto/password-dto";

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

    async updatePassword(user: User, passwordDTO: PasswordDto){
        // old and new password cannot be the same
        if(passwordDTO.oldPassword === passwordDTO.newPassword){
            throw new BadRequestException();
        }

        if(await bcrypt.compare(passwordDTO.newPassword, user.password)){
            throw new BadRequestException();
        }

        if(!await bcrypt.compare(passwordDTO.oldPassword, user.password)){
          throw new BadRequestException();
        }

        user.password = await bcrypt.hash(passwordDTO.newPassword, 10);

        return this.userModel.updateOne(
            {_id: user._id},
            {$set: user},
            {new: true}
        ).exec();
    }

    async delete(id: Types.ObjectId): Promise<User>{
        return await this.userModel.findOneAndDelete({_id: id}).exec();
    }
}
