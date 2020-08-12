
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import RoleEntity from "../accounts/role.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!routeRoles) return true;
    const accountRoles: RoleEntity[] = context.switchToHttp().getRequest().user.roles;
    const hasRoles = () =>
      routeRoles.some(routeRole =>
        accountRoles.some(accountRole => accountRole.name===routeRole),
      );
    return hasRoles();
  }
}
