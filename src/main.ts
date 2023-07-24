import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: '*' },
  });
  app.use(cookieParser());

  await app.listen(3001);

  console.log('app started on port 3001');
}

bootstrap();
