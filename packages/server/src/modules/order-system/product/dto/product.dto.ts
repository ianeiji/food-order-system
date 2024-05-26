import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ProductDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId: number;

  @IsInt()
  @Type(() => Number)
  tenantId: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  storeId: number;

  @IsInt()
  inventory: number;

  @IsOptional()
  productImages?: string[];

  @IsBoolean()
  isOutOfStock?: boolean;
}

export class SearchProductsDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1)
  perPage?: number = 50;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  sort?: 'price' | 'createdAt' = 'createdAt';

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  tenantId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  storeId?: number;
}
