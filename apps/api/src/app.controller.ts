import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { MailerService } from '@/apps/api/src/adapters/mailer/mailer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly mailerService: MailerService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('version-app')
  getVersion(): string {
    const appVersion = process.env.npm_package_version;
    return `Version: ${appVersion}`;
  }

  // @Get('mail')
  // getMail(): void {
  //   this.mailerService.sendEmailWithConfirmationLink('smirnov.ru92@Mail.ru','2','3');
  // }
}
