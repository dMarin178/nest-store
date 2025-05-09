import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { Controller } from './controllers/user/.controller';
import { UserControllerController } from './controllers/user/user-controller/user-controller.controller';
import { CustomerService } from './services/customer/customer.service';
import { CategoriesService } from './services/categories/categories.service';
import { BrandService } from './services/brands/brands.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { UserController } from './controllers/user/user/user.controller';
import { UserControllerController } from './controllers/user/user-controller/user-controller.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, Controller, UserControllerController, UserController],
  providers: [AppService, ProductsService, UserService, BrandService, CategoriesService, CustomerService],
})
export class AppModule {}
