import classroomDb from '../repository/classroom.db'
import { Classroom } from "../model/classroom";


const createClassroom = async (name: string) => {
    const existingClassroom = await classroomDb.findClassroomByName(name);
    if (existingClassroom) {
        throw new Error(`Classroom with name ${name} is already exits`);
    }

    const classroom = new Classroom({ name })
    return await classroomDb.createClassroom(classroom)
}

export default {
    createClassroom
}
