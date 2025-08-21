import database from '../util/database';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const allTeacherPrisma = await database.teacher.findMany({ include: { user: true } })
        return allTeacherPrisma.map(tp => Teacher.from(tp))
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    try {
        // Update the learning path of the teacher with the given ID.
        // Return the updated teacher including its user information.
        // Return a domain object.
        return null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTeachers,
    updateLearningPath,
};
