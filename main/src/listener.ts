import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://avstgkbj:2cw4Vf3NPa_3dMjQyOSVLr2_1EagUZlm@snake.rmq2.cloudamqp.com/avstgkbj'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen()
    .then(resp => console.log('microservices is listening!!!'));
}
bootstrap();
