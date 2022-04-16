import nodemailer from 'nodemailer';

import { config } from '../../configs';
import { EmailActionEnum } from '../../enums';
import { emailInfo } from '../../constants';

class EmailService {
    sendMail(userEmail: string, action: EmailActionEnum) {
        const { subject, html } = emailInfo[action];
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
