import { NestFactory } from '@nestjs/core';
import { AppModule } from '../appModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT || 3005;

  const config = new DocumentBuilder()
    .setTitle('Client Api')
    .setDescription('The Todo list api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
