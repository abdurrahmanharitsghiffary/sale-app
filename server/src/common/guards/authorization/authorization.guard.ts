import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { EnableAuthToken } from 'src/common/decorators/enable-auth/enable-auth.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const enableAuth = this.reflector.getAllAndOverride(EnableAuthToken, [
      context.getHandler,
      context.getClass,
    ]);
    if (enableAuth) {
      // do auth logic
    }
    return true;
  }
}
