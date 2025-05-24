import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    @Inject('TASKS') private task: any,//USE FACOTRY FOR MAKE ASYNC CALLS
    private config: ConfigService
  ){}

  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    return 'Hello World! ' + apiKey;
  }
}
