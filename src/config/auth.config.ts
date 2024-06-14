import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('auth', () => ({
  privateKey: fs.readFileSync('./src/storages/key/jwt.pem', 'utf8'),
  publicKey: fs.readFileSync('./src/storages/key/jwt-pub.pem', 'utf8'),
}));
