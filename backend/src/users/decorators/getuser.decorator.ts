import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/users.schema';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    return user;
  },
);
