import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailDataRequired } from '@sendgrid/mail';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class EmailService {
  constructor(
    @Inject('SendGridToken') private readonly emailService: SendGridService,
    private readonly configService: ConfigService,
    @InjectPinoLogger() private readonly logger: PinoLogger,
  ) {}

  async sendVerificationEmail(email: string, templateData: Record<string, any>, enableTracking = true): Promise<void> {
    try {
      this.logger.info('Send Verification Email');
      const data: Partial<MailDataRequired> = {
        from: 'no-reply@thefarmflow.com',
        to: email,
        subject: 'Verification Email',
        templateId: this.configService.get<string>('VERIFICATION_TEMPLATE_ID'),
        dynamicTemplateData: templateData,
        hideWarnings: true,
      };

      if (enableTracking) {
        data.trackingSettings = {
          clickTracking: {
            enable: true,
          },
          openTracking: {
            enable: true,
          },
        };
      }
      this.logger.info(`Verification Email data => ${JSON.stringify(templateData, null, 2)}`);

      const response = await this.emailService.send(data, false);

      this.logger.info(
        `Enviado correctamente -> ${response[0].statusCode} --- ${JSON.stringify(response[0].body, null, 2)}`,
      );
    } catch (e: any) {
      this.logger.error(`Error sending email => ${JSON.stringify(e, null, 2)}`);
    }
  }

  async sendInviteEmail(email: string, templateData: Record<string, any>, enableTracking = true): Promise<void> {
    try {
      this.logger.info('Send Invite Email');
      const data: Partial<MailDataRequired> = {
        from: 'no-reply@thefarmflow.com',
        to: email,
        subject: 'Invitacion para FarmFlow',
        templateId: this.configService.get<string>('INVITATION_TEMPLATE_ID'),
        dynamicTemplateData: templateData,
        hideWarnings: true,
      };

      if (enableTracking) {
        data.trackingSettings = {
          clickTracking: {
            enable: true,
          },
          openTracking: {
            enable: true,
          },
        };
      }
      this.logger.info(`Invitation Email data => ${JSON.stringify(templateData, null, 2)}`);

      const response = await this.emailService.send(data, false);

      this.logger.info(
        `Enviado correctamente -> ${response[0].statusCode} --- ${JSON.stringify(response[0].body, null, 2)}`,
      );
    } catch (e: any) {
      this.logger.error(`Error sending email => ${JSON.stringify(e, null, 2)}`);
    }
  }
}
