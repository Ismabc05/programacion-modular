import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env', // Le decimos que lea el archivo .env
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    // Los providers son servicios que tiene un módulo
    AppService, // en realidad es el provider useClass
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        // El provider useFactory
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
      // Este useFactory solo se puede hacer dentro de este modulo
    },
  ],
})
export class AppModule {}
