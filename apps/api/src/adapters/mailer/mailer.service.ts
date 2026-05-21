import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import * as process from 'node:process';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendEmailWithConfirmationLink(
    targetEmail: string,
    code: string,
    type: string,
  ) {
    await this.mailerService.sendMail({
      to: targetEmail,

      subject: 'Email confirmation',

      html: this.emailConfirmationMailTemplate(code, type),
    });
  }

  private emailConfirmationMailTemplate(
    code: string,
    queryParam: string,
  ): string {
    return `<h1>Confirmation code</h1>
 <p>To finish confirmation please follow the link below:
     <a href='${process.env.CURRENT_URL}?${queryParam}=${code}'>Confirmation code</a>
 </p>`;
  }
}
