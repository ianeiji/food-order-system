import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { SearchProductsDto, ProductDto } from './dto/product.dto';
import { SessionService } from '../../session/session.service';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly sessionService: SessionService,
  ) {}

  @Get()
  async getProducts(@Query() query: SearchProductsDto, @Req() req: Request) {
    const session = this.sessionService.getSession(req.cookies['sessionId']);
    if (
      !session ||
      session.tenantId !== query.tenantId ||
      session.storeId !== query.storeId
    ) {
      throw new BadRequestException('Invalid session or unauthorized access');
    }
    return this.productService.getProducts(query);
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: number,
    @Query('tenantId') tenantId: number,
    @Query('storeId') storeId: number,
    @Req() req: Request,
  ): Promise<ProductDto> {
    const session = this.sessionService.getSession(req.cookies['sessionId']);
    if (
      !session ||
      session.tenantId !== tenantId ||
      storeId !== session.storeId
    ) {
      throw new BadRequestException('Invalid session or unauthorized access');
    }
    return this.productService.getProduct(id, tenantId, storeId);
  }
}
