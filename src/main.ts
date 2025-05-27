import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SWAGGER DOCS CONFIGURATION
  const config = new DocumentBuilder()
    .setTitle('base Store API')
    .setDescription('base API for store application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //CORS CONFIGURATION
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // NestJS no admite `preflightContinue` aquí, lo maneja automáticamente.
  });

  //GLOBAL PIPES CONFIGURATION
  app.useGlobalPipes(new ValidationPipe({
    //whitelist true, //Ignora los atributos que no esten en el dto
    whitelist: true,
    //forbidNonWhitelisted: true, //Lanza un error si hay atributos que no esten en el dto
  }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
