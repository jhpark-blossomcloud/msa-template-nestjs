import { NotFoundException } from '@nestjs/common';

export const USER_ERRORS = {
  NOT_FOUND: 'USER_NOT_FOUND',
};

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('사용자를 찾을 수 없습니다.', USER_ERRORS.NOT_FOUND);
  }
}
