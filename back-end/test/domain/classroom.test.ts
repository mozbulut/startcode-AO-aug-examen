import { Classroom } from "../../model/classroom"

test('given valid name for classroom, when classroom is created, then classroom is created with those values', () => {
    const classroom = new Classroom({ id: 1, name: 'Classroom 1' });

    expect(classroom.id).toEqual(1);
    expect(classroom.name).toEqual('Classroom 1');
})

test('given empty name for classroom, when classroom is created, then error is thrown', () => {
    expect(() => new Classroom({ name: '' }))
        .toThrow('Classroom name is required');
})

test('given blank name for classroom, when classroom is created, then error is thrown', () => {
    expect(() => new Classroom({ name: '  ' }))
        .toThrow('Classroom name is required');
})