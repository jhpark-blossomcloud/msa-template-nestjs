import { Injectable } from '@nestjs/common';

import { User } from '@app/user/commands/user.data';

@Injectable()
export class HealthService {
  getHealthData() {
    return {
      message: 'pong!',
      currentTime: new Date(),
    };
  }

  getConnectivityData(user: User) {
    return {
      message: `Hello ${user.nickname}!`,
      currentTime: new Date(),
    };
  }
}
