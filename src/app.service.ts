import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject('TASKS') private task: any,//USE FACOTRY FOR MAKE ASYNC CALLS
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ){}
  getHello(): string {
    const apiKey = this.configService.apikey;
    const name = this.configService.database.name;
    return 'Hello World! ' + apiKey;
  }
}
