import { Classroom as ClassroomPrisma } from '@prisma/client';


export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: {
        id?: number;
        name: string
    }) {
        this.validate(classroom.name)
        this.id = classroom.id;
        this.name = classroom.name;
    }

    private validate(name: string) {
        if (!name?.trim()) {
            throw new Error('Classroom name is required');
        }
    }

    static from(classroomPrisma: ClassroomPrisma) {
        return new Classroom({
            id: classroomPrisma.id,
            name: classroomPrisma.name
        })
    }
}