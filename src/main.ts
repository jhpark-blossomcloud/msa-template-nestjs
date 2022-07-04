import { NestFactory } from '@nestjs/core';

import { MainModule } from './main.module';

(async () => {
  const app = await NestFactory.create(MainModule);

  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
