import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IsUniqeInterface } from './unique.interface';
@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private connection: Connection) {}
  async validate(value: any, args: ValidationArguments) {
    const { collection, column }: IsUniqeInterface = args.constraints[0];

    const collectionObj = this.connection.collection(collection);
    const found = await collectionObj.findOne({ [column]: value });
    return !found;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} already exist`;
  }
}
