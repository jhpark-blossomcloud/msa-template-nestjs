import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { User } from '@app/user/commands/user.data';
import { UserNotFoundException } from '@app/user/user.errors';

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService) {}

  async findById(id: string): Promise<User> {
    const server_token = this.configService.get<string>('SERVER_TOKEN', '');

    const { status, data } = await axios.get('/api/server/user', {
      baseURL: 'https://uoslife.pubsub.link',
      params: { server_token, id },
      validateStatus: () => true,
    });

    if (status !== 200) throw new UserNotFoundException();

    return {
      id: data.id,
      nickname: data.nickname,
      avatar: data.photo_id,
      studentYear: data.student_year,
      majorCode: data.major_code,
      isAdmin: data.is_admin,
      permissions: data.student_types.split(','),
    };
  }
}
