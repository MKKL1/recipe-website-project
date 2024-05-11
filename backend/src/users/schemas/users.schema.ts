import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();
//
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) return next(err);
//     // override the cleartext password with the hashed one
//     user.password = hash;
//     next();
//   });
// });
