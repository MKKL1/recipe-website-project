import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from './unique.validator';

export type IsUniqeInterface = {
  collection: string;
  column: string;
};

// decorator function
export function isUnique(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
