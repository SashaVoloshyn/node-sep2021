import { NextFunction, Request, Response } from 'express';

import { studentModel } from '../models';
import { ErrorHandler } from '../error';

class StudentController {
    public async createStudent(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            console.log(req.body);
            const createdStudent = await studentModel.create(req.body);

            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const students = await studentModel.find({})
                .populate('teacher');

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { studentId } = req.params;
            console.log(studentId);

            const studentDeleted = await studentModel.findOneAndDelete({ _id: studentId });

            console.log(studentDeleted);

            if (!studentDeleted) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json({
                message: 'deleted',
            });
        } catch (e) {
            next(e);
        }
    }
}
export const studentController = new StudentController();
