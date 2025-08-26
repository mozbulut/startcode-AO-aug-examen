import classroomDb from "../../repository/classroom.db";
import classroomService from "../../service/classroom.service";

let mockClassroomDbCreateClassroom: jest.Mock;
let mockClassroomDbFindClassroomByName: jest.Mock;

beforeEach(() => {
    mockClassroomDbCreateClassroom = jest.fn();
    mockClassroomDbFindClassroomByName = jest.fn();
})

afterEach(() => {
    jest.clearAllMocks();
})

test('given a unique classroom name, when a classroom is created, then the classroom is created successfully', async () => {

    classroomDb.findClassroomByName = mockClassroomDbFindClassroomByName.mockResolvedValue(null);
    classroomDb.createClassroom = mockClassroomDbCreateClassroom.mockResolvedValue({ id: 1, name: 'Classroom 1' });

    await classroomService.createClassroom('Classroom 1');

    expect(mockClassroomDbFindClassroomByName).toHaveBeenCalledTimes(1);
    expect(mockClassroomDbFindClassroomByName).toHaveBeenCalledWith('Classroom 1');
    expect(mockClassroomDbCreateClassroom).toHaveBeenCalledTimes(1);

})

test('given a name for an existing classroom, when creating a classroom, then an error is thrown', async () => {
    const existingClassroom = { id: 1, name: 'Classroom 1' };

    classroomDb.findClassroomByName = mockClassroomDbFindClassroomByName.mockResolvedValue(existingClassroom);
    classroomDb.createClassroom = mockClassroomDbCreateClassroom;

    await expect(classroomService.createClassroom('Classroom 1'))
        .rejects
        .toThrow(`Classroom with name Classroom 1 is already exits`);

    expect(mockClassroomDbFindClassroomByName).toHaveBeenCalledWith('Classroom 1');
    expect(mockClassroomDbCreateClassroom).not.toHaveBeenCalled();
});