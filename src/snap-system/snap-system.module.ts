import { Module } from '@nestjs/common';
import { ValidatorModule } from '@snapSystem/validators/validator.module';
import { MailModule } from '@snapSystem/mails/mail.module';

@Module({
  providers: [],
  imports: [
    ValidatorModule,
    MailModule
  ],
  exports :[
    MailModule
  ]
})
export class SnapSystemModule {
}
