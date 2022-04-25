import { EmailActionEnum } from '../enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to my server',
        templateName: 'welcome',
    },
    [EmailActionEnum.REGISTRATION]: {
        subject: 'You Registered',
        templateName: 'registration',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account has banned',
        templateName: 'account_blocked',

    },
    [EmailActionEnum.ACCOUNT_DELETED]: {
        subject: 'Your account has deleted',
        templateName: 'account_deleted',
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'FORGOT_PASSWORD',
        templateName: 'forgot_password',
    },
};
