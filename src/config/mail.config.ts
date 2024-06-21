import { registerAs } from '@nestjs/config';
import process from 'process';

export default registerAs(
  'mail',
  () => ({
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 587,
    user: process.env.MAIL_USERNAME || 'default',
    password: process.env.MAIL_PASSWORD || '',
    from: process.env.MAIL_FROM || '',
    template_dir: process.env.MAIL_TEMPLATE_DIR,
  }),
);
