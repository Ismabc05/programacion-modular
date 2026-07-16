import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomersService } from './services/customers.services';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.services';

@Module({
  imports: [],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
