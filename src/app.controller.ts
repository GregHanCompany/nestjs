import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Controller({ path: '' })
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    return this.configService.get('dbconfig.dev.type');
  }
}
