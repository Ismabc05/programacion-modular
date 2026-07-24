import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD734575';

const client = new Client({
  // Lo pasamos por useValue ya que es un objeto
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: '123456',
  port: 5432,
});

client.connect();

@Global() // Todos los providers que defina en este módulo van a ser globales, es decir lo puede usar cualquier modulo gracias a este decorador
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, // el provider useValue se usa para traer valores de entorno, no es muy aconsejable ya que podemos tener muchos valores, para ellos se usa el ConfigModule
    },
    {
      provide: 'PG',
      useValue: client, // el provider useValue se usa para traer valores de entorno, no es muy aconsejable ya que podemos tener muchos valores, para ellos se usa el ConfigModule
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
