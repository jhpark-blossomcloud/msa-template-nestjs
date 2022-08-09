import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/jwt/jwt.guard';
import { AdminGuard } from '@app/auth/role/admin.guard';
import { HealthService } from '@app/health/health.service';
import { Request } from '@infrastructure/types/request.type';

@Controller('health')
@ApiTags('ServiceHealth')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'API 서버 상태를 확인합니다.' })
  getHealth() {
    return this.healthService.getHealthData();
  }

  @Get('auth')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '계정 정보 연동 상태를 확인합니다.' })
  getSecuredHealth(@Req() { user }: Request) {
    return this.healthService.getConnectivityData(user);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '계정 정보 연동 상태를 확인합니다. (관리자)' })
  getSecuredAdminHealth(@Req() { user }: Request) {
    return this.healthService.getConnectivityData(user);
  }
}
