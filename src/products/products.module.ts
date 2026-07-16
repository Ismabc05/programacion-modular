import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
})
export class ProductsModule {}
