import { Prisma } from '@prisma/client';

export type TeacherWithUser = Prisma.TeacherGetPayload<{
    include: { user: true }
}>;