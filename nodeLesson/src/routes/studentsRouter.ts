import { Router } from 'express';
import { studentController } from '../controllers';

export const studentsRouter = Router();

studentsRouter.get('/', studentController.getAll);

studentsRouter.post('/', studentController.createStudent);

studentsRouter.delete('/:studentId', studentController.removeOne);
