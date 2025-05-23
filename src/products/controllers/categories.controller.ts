import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/category.dto';
import { CategoriesService } from 'src/products/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0
  ) {
    return this.categoriesService.findAll(); //Luego implementar la paginacion
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `categories filter route`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and categorie ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCategoryDto){
    return this.categoriesService.create(payload)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  replace(@Param('id') id: string, @Body() payload: CreateCategoryDto){
    return this.categoriesService.replace(+id, payload)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto){
    return this.categoriesService.update(+id, payload)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
