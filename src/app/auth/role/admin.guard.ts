import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { User } from '@app/user/commands/user.data';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return user.isAdmin;
  }
}
