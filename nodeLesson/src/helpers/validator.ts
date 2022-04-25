import Joi from 'joi';

import { commonValidator } from './commonValidator.helpers';

class Validator {
    public static authSchema: Joi.ObjectSchema = Joi.object({
        firstName: commonValidator.name.min(2).max(20)
            .required()
            .messages({
                'string.empty': 'First Name can`t be an empty field',
                'string.pattern.base': 'First Name should have only Latin letters',
                'string.min': 'min First Name length : {#limit}',
                'string.max': 'max First Name length : {#limit}',
                'any.required': 'First Name is a required field',
            }),

        lastName: commonValidator.name.min(3).max(35)
            .required()
            .messages({
                'string.empty': 'Last Name can`t be an empty field',
                'string.pattern.base': 'Last Name should have only Latin letters',
                'string.min': 'min Last Name length : {#limit}',
                'string.max': 'max Last Name length : {#limit}',
                'any.required': 'Last Name is a required field',
            }),

        age: Joi.number().min(16).max(100).required()
            .messages({
                'number.base': 'age should be a type of number',
                'number.empty': 'age can`t be an empty field',
                'number.min': 'min age : {#limit}',
                'any.required': 'age is a required field',
            }),

        phone: commonValidator.phone.min(11).max(20)
            .required()
            .messages({
                'string.empty': 'phone can`t be an empty field',
                'string.pattern.base': 'phone should have numbers also allowed "+-" characters and without spaces',
                'string.min': 'min phone length : {#limit}',
                'string.max': 'max phone length :{#limit}',
                'any.required': 'phone is a required field',
            }),

        email: commonValidator.email.required()
            .messages({
                'string.empty': 'email can`t be an empty field',
                'string.pattern.base': 'email should have only Latin letters also "@" and without spaces',
                'any.required': 'email is a required field',
            }),

        password: commonValidator.password.min(8).max(30)
            .alphanum()
            .required()
            .messages({
                'string.empty': 'password can`t be an empty field',
                'string.pattern.base': 'the password must consist of numbers, Latin lowercase and uppercase letters, without spaces.',
                'string.min': 'min password length : {#limit}',
                'string.max': 'max password length : {#limit}',
                'any.required': 'password is a required field',
            }),
    });

    public static authLoginSchema: Joi.ObjectSchema = Joi.object({
        email: commonValidator.email.required()
            .messages({
                'string.empty': 'email can`t be an empty field',
                'string.pattern.base': 'email should have only Latin letters also "@" and without spaces',
                'any.required': 'email is a required field',
            }),

        password: commonValidator.password.min(8).max(30)
            .alphanum()
            .required()
            .messages({
                'string.empty': 'password can`t be an empty field',
                'string.pattern.base': 'the password must consist of numbers, Latin lowercase and uppercase letters, without spaces.',
                'string.min': 'min password length : {#limit}',
                'string.max': 'max password length : {#limit}',
                'any.required': 'password is a required field',
            }),
    });

    public static authEmail: Joi.ObjectSchema = Joi.object({
        email: commonValidator.email.required()
            .messages({
                'string.empty': 'email can`t be an empty field',
                'string.pattern.base': 'email should have only Latin letters also "@" and without spaces',
                'any.required': 'email is a required field',
            }),

    });

    public static authPassword: Joi.ObjectSchema = Joi.object({
        password: commonValidator.password.min(8).max(30)
            .alphanum()
            .required()
            .messages({
                'string.empty': 'password can`t be an empty field',
                'string.pattern.base': 'the password must consist of numbers, Latin lowercase and uppercase letters, without spaces.',
                'string.min': 'min password length : {#limit}',
                'string.max': 'max password length : {#limit}',
                'any.required': 'password is a required field',
            }),
    });

    public static authTokenSchema: Joi.ObjectSchema = Joi.object({
        authorization: Joi.string().min(3).max(200).required(),
    });

    public static postSchema: Joi.ObjectSchema = Joi.object({
        title: Joi.string().min(1).max(250).required()
            .messages({
                'string.empty': 'text can`t be an empty field',
                'string.min': 'min title length : {#limit}',
                'string.max': 'max title length : {#limit}',
                'any.required': 'text is a required field',
            }),

        text: Joi.string().min(1).max(250).required()
            .messages({
                'string.empty': 'text can`t be an empty field',
                'string.min': 'min text length : {#limit}',
                'string.max': 'max text length : {#limit}',
                'any.required': 'text is a required field',
            }),

        userId: Joi.number().min(0).required()
            .messages({
                'number.base': 'authorId should be a type of number',
                'number.empty': 'authorId can`t be an empty field',
                'number.min': 'authorId should be from {#limit}',
                'any.required': 'authorId is a required field',
            }),
    });

    public static commentSchema: Joi.ObjectSchema = Joi.object({
        authorId: Joi.number().min(0).required()
            .messages({
                'number.base': 'authorId should be a type of number',
                'number.empty': 'authorId can`t be an empty field',
                'number.min': 'authorId should be from {#limit}',
                'any.required': 'authorId is a required field',
            }),

        postId: Joi.number().min(0).required()
            .messages({
                'number.base': 'postId should be a type of number',
                'number.empty': 'postId can`t be an empty field',
                'number.min': 'postId should be from {#limit}',
                'any.required': 'postId is a required field',
            }),

        text: Joi.string().min(1).max(250).required()
            .messages({
                'string.empty': 'text can`t be an empty field',
                'string.min': 'min text length : {#limit}',
                'string.max': 'max text length : {#limit}',
                'any.required': 'text is a required field',
            }),
    });

    public static userPatchSchema: Joi.ObjectSchema = Joi.object({
        phone: commonValidator.phone.min(11).max(20)
            .required()
            .messages({
                'string.empty': 'phone can`t be an empty field',
                'string.pattern.base': 'phone should have numbers also allowed "+-" characters and without spaces',
                'string.min': 'min phone length : {#limit}',
                'string.max': 'max phone length :{#limit}',
                'any.required': 'phone is a required field',
            }),

        email: commonValidator.email
            .required()
            .messages({
                'string.empty': 'email can`t be an empty field',
                'string.pattern.base': 'email should have only Latin letters also "@" and without spaces',
                'any.required': 'email is a required field',
            }),

        password: commonValidator.password.min(8).max(30)
            .alphanum()
            .required()
            .messages({
                'string.empty': 'password can`t be an empty field',
                'string.pattern.base': 'the password must consist of numbers, Latin lowercase and uppercase letters, without spaces.',
                'string.min': 'min password length : {#limit}',
                'string.max': 'max password length : {#limit}',
                'any.required': 'password is a required field',
            }),
    });

    public static paramsSchema: Joi.ObjectSchema = Joi.object({
        userId: commonValidator.userId.required().messages({
            'number.base': 'params should be a type of number',
            'number.empty': 'params  be an empty field',
            'any.required': 'params is a required field',
        }),
    });
}

export const {
    authSchema, authLoginSchema, authEmail, authPassword, authTokenSchema, commentSchema, postSchema, userPatchSchema, paramsSchema,
} = Validator;
