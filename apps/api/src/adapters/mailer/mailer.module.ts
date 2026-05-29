import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',

        auth: {
          user: process.env.MAILER_ADDR,
          pass: process.env.MAILER_PASS,
        },
      },

      defaults: {
        from: `"Sendling" <${process.env.MAILER_ADDR}>`,
      },
    }),
  ],

  providers: [MailerService],

  exports: [MailerService],
})
export class CustomMailerModule {}
