import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //whitelist true, //Ignora los atributos que no esten en el dto
    whitelist: true,
    //forbidNonWhitelisted: true, //Lanza un error si hay atributos que no esten en el dto
  }));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
