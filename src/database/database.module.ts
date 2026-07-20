import { Module, Global } from '@nestjs/common';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD734575';

@Global() // Todos los providers que defina en este módulo van a ser globales, es decir lo puede usar cualquier modulo gracias a este decorador
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, // el provider useValue se usa para traer valores de entorno, no es muy aconsejable ya que podemos tener muchos valores, para ellos se usa el ConfigModule
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
