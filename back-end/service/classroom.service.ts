import { ClassroomInput } from "../types";

import classroomDb from '../repository/classroom.db'
import { Classroom } from "../model/classroom";


const createClassroom = async (classroomInput: ClassroomInput) => {
    const classroom = new Classroom(classroomInput)
    return classroomDb.createClassroom(classroom)
}

export default {
    createClassroom
}
