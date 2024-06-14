import * as process from 'process';
import { AppConfigOption } from 'src/config/types/config.types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): AppConfigOption => ({
    url: process.env.APP_URL || 'http://localhost:3000',
    secret: process.env.APP_SECRET || '',
    expireIn: process.env.TOKEN_EXPIRE_IN || '3h',
    debug: process.env.APP_DEBUG == 'true',
  }),
);
