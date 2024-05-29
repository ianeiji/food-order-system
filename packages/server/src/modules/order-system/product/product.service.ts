import { Injectable } from '@nestjs/common';
import { PrismaService } from '@config/prisma.service';
import { SearchProductsDto, ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(dto: SearchProductsDto) {
    const {
      keyword,
      minPrice,
      maxPrice,
      categoryId,
      page,
      perPage,
      order = 'asc',
      sort = 'createdAt',
      tenantId,
      storeId,
    } = dto;

    const whereClause = {
      AND: [
        keyword ? { name: { contains: keyword } } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        categoryId ? { categoryId } : {},
        tenantId ? { tenantId } : {},
        storeId ? { storeId } : {},
      ],
    };

    const orderBy = { [sort]: order };

    const products = await this.prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        productImages: true,
        inventory: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy,
    });

    const total = await this.prisma.product.count({
      where: whereClause,
    });
    const lastPage = Math.ceil(total / perPage);
    const prev = page > 1 ? page - 1 : null;
    const next = page < lastPage ? page + 1 : null;

    const productDtos = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      tenantId: product.tenantId,
      storeId: product.storeId,
      inventory: product.inventory.reduce((acc, inv) => acc + inv.quantity, 0),
      productImages: product.productImages.map((image) => image.url),
      isOutOfStock:
        product.inventory.reduce((acc, inv) => acc + inv.quantity, 0) === 0,
    }));

    return {
      data: productDtos,
      meta: {
        total,
        page,
        perPage,
        lastPage,
        prev,
        next,
      },
    };
  }

  async getProduct(
    id: number,
    tenantId: number,
    storeId: number,
  ): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        productImages: true,
        inventory: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (
      product.tenantId !== tenantId ||
      (storeId && product.storeId !== storeId)
    ) {
      throw new Error('Unauthorized access');
    }

    const inventory = product.inventory.reduce(
      (acc, inv) => acc + inv.quantity,
      0,
    );
    const isOutOfStock = inventory === 0;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      tenantId: product.tenantId,
      storeId: product.storeId,
      inventory,
      productImages: product.productImages.map((image) => image.url),
      isOutOfStock,
    };
  }
}
