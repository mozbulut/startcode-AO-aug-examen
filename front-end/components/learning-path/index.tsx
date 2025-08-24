import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [selectedPath, setSelectedPath] = useState(learningPath);

  const handleLearningPathChange = (event: { target: { value: string } }) => {
    {
      const newLearningPath = event.target.value;
      TeacherService.updateLearningPath(teacherId, newLearningPath);

      setSelectedPath(newLearningPath);
    }
  };

  return (
    <td className="ml-6">
      <select id="learningPath" className="ml-2 p-1" value={selectedPath} onChange={handleLearningPathChange}>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </td>
  );
};

export default LearningPath;
