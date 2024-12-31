import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // new ValidationPipe({
  //   disableErrorMessages: true, // to disable the default error messages
  //  whitelist: true, // to strip out any validation errors that are not defined in the DTO
  // { forbidNonWhitelisted: true, whitelist: true }  to strip out any validation errors that are not defined in the DTO and send error
  // }),
  // transform: true, // to transform the payload into a DTO instance if it is possible
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
