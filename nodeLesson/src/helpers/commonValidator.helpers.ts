import Joi from 'joi';

import { regexConstant } from '../constants';

export const commonValidator = {
    name: Joi.string().regex(regexConstant.NAME).trim(),
    phone: Joi.string().regex(regexConstant.PHONE).trim(),
    email: Joi.string().regex(regexConstant.EMAIL).lowercase().trim(),
    password: Joi.string().regex(regexConstant.PASSWORD).trim(),
    userId: Joi.number(),
};
