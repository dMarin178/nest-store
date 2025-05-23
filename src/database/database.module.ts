import { Global, Module } from '@nestjs/common';

const API_KEY = '121323';
const API_KEY_PROD = 'PROD_121323';

//GLOBALS MODULES
@Global()
@Module({
  providers: [
    //PROVIDER USE_VALUE
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? API_KEY_PROD : API_KEY,
    }
  ],
  exports: ['API_KEY'], //EXPORTS FOR USE IN OTHER MODULES
})
export class DatabaseModule {}
