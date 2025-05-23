import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customer.dto';
import { CustomerService } from 'src/users/services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
  ) {
    return this.customerService.findAll();
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `customer filter route`;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Query('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCustomerDto){
    return this.customerService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  replace(@Param('id', ParseIntPipe) id: number, @Body() payload: CreateCustomerDto){
    return this.customerService.replace(id, payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto){
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

}
