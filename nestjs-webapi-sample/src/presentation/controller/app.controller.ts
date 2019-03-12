import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from '../../application/serivce/app.service';
import { LoggingInterceptor } from './logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
