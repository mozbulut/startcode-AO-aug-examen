import { Classroom } from '../model/classroom';
import database from '../util/database';

const createClassroom = async (classroom: Classroom) => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: {
                name: classroom.name
            }
        })
        return Classroom.from(classroomPrisma);
    } catch (error) {
        console.log(error)
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createClassroom
}