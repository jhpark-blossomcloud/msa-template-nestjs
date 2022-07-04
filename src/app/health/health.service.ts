import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthData() {
    return {
      message: 'pong!',
      currentTime: new Date(),
    };
  }
}
