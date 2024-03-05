import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './utils/cors.options.util';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { WinstonInstance, levAndColor } from './utils/winston.logger.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import winston from 'winston';

const port = process.env.PORT ?? 8000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
    logger: WinstonModule.createLogger({
      instance: WinstonInstance,
    }),
  });  
  
  const config = new DocumentBuilder()
    .setTitle('ARAM')
    .setDescription("Hello, We're ARAM!")
    .setVersion('0.0.1(Beta)')
    .addTag('Aram')
    .build();
  const swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, swagger);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  winston.addColors(levAndColor.colors);

  await app.listen(port);
}
bootstrap();
