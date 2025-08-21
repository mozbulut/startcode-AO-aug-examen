const getAllTeachers = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/teachers")
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/teachers/${teacherId}/learningpath?learningPath=${learningPath}`,
    {
      method: "PUT",
    }
  )
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
