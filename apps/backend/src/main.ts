import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BACKEND_PORT, BACKEND_URL } from './utils/configurations';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Dine and Dash')
    .setDescription('Api description for Dine and Dash full stack food delivery application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(BACKEND_PORT || 3001);
}
bootstrap().then(() => Logger.log(`Backend server running on ${BACKEND_URL}:${BACKEND_PORT || 3001}`));
