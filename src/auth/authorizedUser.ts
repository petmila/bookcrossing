import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizedAs = createParamDecorator(
  (options: null, context: ExecutionContext) => {
    const currentUserId = context.switchToHttp().getRequest().currentUserId;
    return currentUserId;
  },
);
