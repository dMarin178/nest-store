import { Module } from '@nestjs/common';
import { HttpModule, HttpService} from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',//ENV VARIABLES
      isGlobal: true,//USE IN ALL MODULES
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
