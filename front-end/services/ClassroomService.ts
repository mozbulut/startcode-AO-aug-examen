const addClassroom = (name: string, token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
};

const ClassroomService = {
    addClassroom,
};

export default ClassroomService;