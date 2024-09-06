import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BACKEND_PORT, BACKEND_URL } from '../utils/configurations';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(BACKEND_PORT || 3001);
}
bootstrap().then(() => Logger.log(`Backend server running on ${BACKEND_URL}:${BACKEND_PORT || 3001}`));
