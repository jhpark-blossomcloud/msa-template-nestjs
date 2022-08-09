import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CIDR from 'ip-cidr';

type AuthenticationPayload = { token: string; ip: string };

@Injectable()
export class ServerAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private serverToken = this.configService.get<string>('SERVER_TOKEN', '');

  private localCIDR = new CIDR(
    this.configService.get<string>('LOCAL_CIDR', '127.0.0.0/8'),
  );

  private podCIDR = new CIDR(
    this.configService.get<string>('POD_CIDR', '10.20.0.0/24'),
  );

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const isAuthenticated = this.authenticate({
      token: request.headers['x-server-token'],
      ip: request.headers['x-real-ip'] || request.ip,
    });

    if (!isAuthenticated) throw new UnauthorizedException();

    return true;
  }

  private authenticate(data: AuthenticationPayload): boolean {
    if (data.token) return this.serverToken === data.token;
    return this.localCIDR.contains(data.ip) || this.podCIDR.contains(data.ip);
  }
}
