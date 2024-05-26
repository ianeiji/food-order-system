import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { SearchProductsDto, ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: SearchProductsDto) {
    return this.productService.getProducts(query);
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query('tenantId', ParseIntPipe) tenantId: number,
    @Query('storeId', ParseIntPipe) storeId: number,
  ): Promise<ProductDto> {
    return this.productService.getProduct(id, tenantId, storeId);
  }
}
