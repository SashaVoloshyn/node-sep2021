import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const teacherSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },

    lastName: {
        type: String,
        trim: true,
    },

    subject: {
        type: String,
        trim: true,
    },

    age: {
        type: Number,
        default: 18,
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

export const teacherModel = model('teacher', teacherSchema);
