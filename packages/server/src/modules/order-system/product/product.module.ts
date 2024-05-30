import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/config/prisma.service';
import { SessionService } from 'src/modules/session/session.service';

@Module({
  providers: [ProductService, PrismaService, SessionService],
  controllers: [ProductController],
})
export class ProductModule {}
