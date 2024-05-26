import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/order-system/product/product.module';
import { SessionMiddleware } from './modules/session/session.middleware';
import { SessionService } from './modules/session/session.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule, // this will make the .env variables available to the entire app
  ],
  providers: [SessionService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
