import { MailerService } from '@nestjs-modules/mailer';
import { IMailOptions } from '@snapSystem/mails/mail-options.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  public constructor(private readonly mailer: MailerService) {
  }

  private send(options: IMailOptions): Promise<any> {
    return this.mailer.sendMail(options);
  }

  //to do implement QUEUE

  public now(options: IMailOptions): Promise<any> {
    return this.send(options).catch((err) => {
      return Promise.reject(err);
    });
  }

}
