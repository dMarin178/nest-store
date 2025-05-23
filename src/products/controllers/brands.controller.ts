import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';
import { BrandsService } from 'src/products/services/brands.service';

@Controller('brand')
export class BrandController {
  //Injecting serivices
  constructor(private brandService: BrandsService){}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
  ) {
    return this.brandService.findAll();
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `brand filter route`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateBrandDto){
    return this.brandService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  replace(@Param('id', ParseIntPipe) id: number, @Body() payload: CreateBrandDto){
    return this.brandService.replace(id, payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto){
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      message: 'brand deleted'
    }
  }

}
