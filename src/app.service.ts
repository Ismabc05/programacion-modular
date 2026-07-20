import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configservice: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    const apiKey = this.configservice.get<string>('API_KEY');
    const dbName = this.configservice.get('DATABASE_NAME');
    return `Hello World! ${apiKey} ${dbName}`;
  }
}
