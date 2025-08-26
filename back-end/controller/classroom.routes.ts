import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types';

const classroomRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Classroom:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the classroom.
 *         name:
 *           type: string
 *           description: The name of the classroom.
 *     ClassroomInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the classroom.
 */

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
 *             $ref: '#/components/schemas/ClassroomInput'
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
classroomRouter.post('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { role } = req.auth;
        const classroomInput = <ClassroomInput>req.body;
        const classroom = await classroomService.createClassroom(classroomInput.name.trim(), role);

        res.status(201).json(classroom);
    } catch (error) {
        next(error);
    }
})

export { classroomRouter }