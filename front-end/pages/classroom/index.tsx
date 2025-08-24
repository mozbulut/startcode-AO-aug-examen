import AddClassroomForm from "@components/classroom/AddClassroomForm";
import Header from "@components/header";
import ClassroomService from "@services/ClassroomService";
import { LoggedInUser, StatusMessage, User } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

const AddClassroomPage: React.FC = () => {
    const { t } = useTranslation();

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [name, setName] = useState('');
    const [nameFormError, setNameFormError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);


    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, [])

    if (loggedInUser === null) {
        return <p>Loading...</p>;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNameFormError(null);

        if (!name.trim()) {
            setNameFormError(t('form-error'))
            return;
        }

        try {
            const response = await ClassroomService.addClassroom(name, loggedInUser.token)
            if (response.ok) {
                const newClassroom = await response.json();
                console.log(newClassroom)
                setStatusMessage({
                    message: t('created'),
                    type: 'success'
                })

            } else if (response.status === 400) {
                setStatusMessage({
                    message: t('exits'),
                    type: 'error'
                })
            }
        } catch (error) {
            setStatusMessage({
                message: t('failed'),
                type: 'error'
            })
        }
    }


    return (<>
        <Header />
        <main className="p-6">
            {loggedInUser && loggedInUser.role == 'admin'
                ? (
                    <div>
                        {statusMessage && (
                            statusMessage.type == 'success' ? <div>{statusMessage.message}</div> : <div>{statusMessage.message}</div>
                        )}
                        <AddClassroomForm
                            onSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            nameError={nameFormError}
                        />
                    </div>
                )
                : <div>
                    <p className="text-red-800">{t('classroom.unauthorized')}</p>
                </div>
            }
        </main >
    </>)
}


export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default AddClassroomPage;