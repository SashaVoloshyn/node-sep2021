import Joi from 'joi';

import { regexConstant } from '../constants';

export const commonValidator = {
    name: Joi.string().regex(regexConstant.NAME),
    phone: Joi.string().regex(regexConstant.PHONE),
    email: Joi.string().regex(regexConstant.EMAIL),
    password: Joi.string().regex(regexConstant.PASSWORD),
    userId: Joi.number(),
};
