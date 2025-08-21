import { TeacherWithUser } from '../util/prisma';
import { User } from './user';

export class Teacher {
    readonly id?: number;
    readonly user: User;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly learningPath: string;

    constructor(teacher: {
        id?: number;
        user: User;
        createdAt?: Date;
        updatedAt?: Date;
        learningPath: string;
    }) {
        this.id = teacher.id;
        this.user = teacher.user;
        this.createdAt = teacher.createdAt;
        this.updatedAt = teacher.updatedAt;
        this.learningPath = teacher.learningPath;
    }

    static from({ id, createdAt, learningPath, updatedAt, user }: TeacherWithUser) {
        return new Teacher({
            id,
            learningPath,
            user: User.from(user),
            createdAt,
            updatedAt
        });
    }
}