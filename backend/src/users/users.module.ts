import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './schemas/users.schema';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SerializeInterceptor,
  ],
  providers: [UsersService],
  exports: [UsersService, SerializeInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
