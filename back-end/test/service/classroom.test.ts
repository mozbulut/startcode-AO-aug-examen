import classroomDb from "../../repository/classroom.db";
import classroomService from "../../service/classroom.service";

let mockClassroomDbCreateClassroom: jest.Mock;
let mockClassroomDbfindClassroomByName: jest.Mock;

beforeEach(() => {
    mockClassroomDbCreateClassroom = jest.fn();
    mockClassroomDbfindClassroomByName = jest.fn();
})

test('given a unique classroom name, when a classroom is created, then the classroom is created successfully', async () => {

    classroomDb.findClassroomByName = mockClassroomDbfindClassroomByName.mockResolvedValue(null);
    classroomDb.createClassroom = mockClassroomDbCreateClassroom.mockResolvedValue({ id: 1, name: 'Classroom 1' });

    await classroomService.createClassroom('Classroom 1');

    expect(mockClassroomDbfindClassroomByName).toHaveBeenCalledTimes(1);
    expect(mockClassroomDbCreateClassroom).toHaveBeenCalledTimes(1);

})