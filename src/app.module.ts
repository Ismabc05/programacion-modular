import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: '123456',
  port: 5432,
});

client.connect();
client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
});

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // Dependiendo del entorno (NODE_ENV), carga un archivo .env diferente, en caso de que no pueda devolver ninguno le enviamos el .env
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
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
