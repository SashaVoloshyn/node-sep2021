import { EmailActionEnum } from '../enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to my server',
        html: 'HI!!!!!!!!!!!!!!!!!!!-__-',
    },
    [EmailActionEnum.REGISTRATION]: {
        subject: 'You Registered',
        html: 'WOOOW  YOUR ACCOUNT HAS BEEN REGISTERED -__-',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account has banned',
        html: 'O_ops your account has banned',

    },
    [EmailActionEnum.ACCOUNT_DELETED]: {
        subject: 'Your account has deleted',
        html: 'O_o   YOUR ACCOUNT HAS DELETED  BYE-BYE',
    },
};
