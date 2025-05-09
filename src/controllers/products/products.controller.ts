import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //PRIMERO LAS RUTAS ABSOLUTAS
  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit: number = 100, //ASI SE DEFINE POR DEFECTO UN PARAM QUERY
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `products filter route`;
  }

  //LUEGO LAS RUTAS DINAMICAS
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  replace(@Param('id', ParseIntPipe) id: number, @Body() payload: CreateProductDto) {
    return this.productsService.replace(id, payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
