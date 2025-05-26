import { Module } from '@nestjs/common';
import { HttpModule, HttpService} from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',//ENV VARIABLES
      load: [config],//CONFIGURATION FILE
      isGlobal: true,//USE IN ALL MODULES
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        API_KEY: Joi.string().required(),
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
      })
    }),
    DatabaseModule,
    HttpModule,
    UsersModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    //USE FACOTRY FOR MAKE ASYNC CALLS
    // !!!Is not recomended to use this method for API calls, this is used for connect to a database!!!
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    }
  ],
})
export class AppModule {}
