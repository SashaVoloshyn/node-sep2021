import mongoose from 'mongoose';

import { teacherModel } from './teachers';

const { Schema, model } = mongoose;

const studentSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
    },

    lastName: {
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

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
        default: null,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

studentSchema.virtual('fullName').get(function () {
    return `${this.firstName}  ${this.lastName}`;
});

studentSchema.pre('findOne', function () {
    this.populate('teacher');
});

export const studentModel = model('student', studentSchema);
