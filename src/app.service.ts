import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    @Inject('API_KEY') private apiKey: string,//PROVIDER USE_VALUE EXAMPLE
    @Inject('TASKS') private task: any,//USE FACOTRY FOR MAKE ASYNC CALLS
  ){}

  getHello(): string {
    console.log(this.task);
    return 'Hello World! ' + this.apiKey;
  }
}
