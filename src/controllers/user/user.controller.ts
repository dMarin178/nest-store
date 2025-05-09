import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  //PRIMERO LAS RUTAS ABSOLUTAS
  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit') limit: number = 100, //ASI SE DEFINE POR DEFECTO UN PARAM QUERY
    @Query('offset') offset: number = 0,
    @Query('role') role: string,
  ) {
    return this.usersService.findAll();
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilter() {
    return `users filter route`;
  }

  //LUEGO LAS RUTAS DINAMICAS
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  replace(@Param('id', ParseIntPipe) id: number, @Body() payload: CreateUserDto) {
    return this.usersService.replace(id, payload);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

