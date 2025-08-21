import express, { NextFunction, Request, Response } from 'express';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the classroom.
 *     responses:
 *       201:
 *         description: The created classroom object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       400:
 *         description: Bad request (e.g., validation error).
 *       401:
 *         description: Unauthorized (e.g., not an admin).
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({ hello: "hello" })
    } catch (error) {
        next(error);
    }
})

export { classroomRouter }