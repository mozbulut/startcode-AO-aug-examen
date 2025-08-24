import { useState } from "react";
import { useTranslation } from 'next-i18next';

type Props = {
    onSubmit: (name: string) => void;

}
const AddClassroomForm: React.FC<Props> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setNameError(null);
    }

    return (<>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
                <h1 className="text-left">{t('classroom.add-classroom')}</h1>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    {t('classroom.label-name')}
                </label>
                <input
                    id="nameInput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
                {nameError && <div className="text-red-800 mt-1">{nameError}</div>}
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {t('classroom.add')}
            </button>
        </form>
    </>)
}

export default AddClassroomForm;
