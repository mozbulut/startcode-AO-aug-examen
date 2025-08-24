import database from '../util/database';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const allTeacherPrisma = await database.teacher.findMany({
            include: {
                user: true
            },
            orderBy: {
                user: {
                    lastName: 'asc'
                }
            }
        })
        return allTeacherPrisma.map(tp => Teacher.from(tp))
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    try {
        const teacherPrisma = await database.teacher.update({
            where: {
                id: teacherId
            },
            data: {
                learningPath: learningPath
            },
            include: {
                user: true
            }
        })

        return Teacher.from(teacherPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTeachers,
    updateLearningPath,
};
