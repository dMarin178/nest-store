import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //PRIMERO LAS RUTAS ABSOLUTAS
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
