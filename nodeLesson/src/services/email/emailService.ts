import EmailTemplate from 'email-templates';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import path from 'path';

import { config } from '../../configs';
import { EmailActionEnum } from '../../enums';
import { emailInfo } from '../../constants';

class EmailService {
    private readonly templateRenderer = new EmailTemplate({
        views: {
            // ts-ignore
            root: path.join(__dirname, '../../', 'email-templates'),
        },
    });


    public async sendMail(userEmail: string, action: EmailActionEnum, context:object):Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: config.FRONTEND_URL });

        const html = await this.templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep2021-Node',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
