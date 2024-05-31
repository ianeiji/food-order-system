import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '@modules/order-system/product/product.module';
import { SessionMiddleware } from '@modules/session/session.middleware';
import { SessionModule } from '@modules/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule, // this will make the .env variables available to the entire app
    SessionModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
