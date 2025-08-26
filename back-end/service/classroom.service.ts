import classroomDb from '../repository/classroom.db'
import { Classroom } from "../model/classroom";
import { ClassesError, ForbiddenError } from '../error/errors';
import { Role } from '../types';


const createClassroom = async (classroomName: string, role: Role) => {
    if (role !== 'admin') {
        throw new ForbiddenError(`Unauthorized to perform this action`);
    }

    const existingClassroom = await classroomDb.findClassroomByName(classroomName);
    if (existingClassroom) {
        throw new ClassesError(`Classroom with name ${classroomName} is already exits`);
    }

    const classroom = new Classroom({ name: classroomName });
    return await classroomDb.createClassroom(classroom);

}

export default {
    createClassroom
}
