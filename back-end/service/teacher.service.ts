import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';
import { Role } from '../types';
import { ForbiddenError } from '../error/errors';

const getAllTeachers = async (): Promise<Teacher[]> => teacherDb.getAllTeachers();

const updateLearningPath = async (teacherId: number, learningPath: string, role: Role): Promise<Teacher> => {
    if (role !== 'admin') {
        throw new ForbiddenError(`Unauthorized to perform this action`);
    }

    return teacherDb.updateLearningPath(teacherId, learningPath);
};

export default { getAllTeachers, updateLearningPath };
