import AddClassroomForm from "@components/classroom/AddClassroomForm";
import Header from "@components/header";
import ClassroomService from "@services/ClassroomService";
import { LoggedInUser, StatusMessage, User } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';


const AddClassroomPage: React.FC = () => {
    const { t } = useTranslation();

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [name, setName] = useState('');
    const [nameFormError, setNameFormError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);


    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, [])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNameFormError(null);
        setStatusMessage(null);

        if (!name.trim()) {
            setNameFormError(t('classroom.form-name-required'))
            return;
        }

        try {
            const response = await ClassroomService.addClassroom(name, loggedInUser.token)
            if (response.ok) {
                const newClassroom = await response.json();
                setStatusMessage({
                    message: t('classroom.add-success', { name: newClassroom.name, id: newClassroom.id }),
                    type: 'success',
                });
                setName('')

            } else if (response.status === 400) {
                setStatusMessage({
                    message: t('classroom.add-exits'),
                    type: 'error',
                });
            }
            else {
                setStatusMessage({
                    message: t('general.error'),
                    type: 'error',
                });
            }
        } catch (error) {
            setStatusMessage({ message: t('general.error'), type: 'error' });
        }
    }

    return (<>
        <Head>
            <title>{t("classroom.add-classroom")}</title>
        </Head>
        <Header />
        <main className="p-6">
            {loggedInUser && loggedInUser.role == 'admin'
                ? (
                    <div className="max-w-sm mx-auto">
                        <h1 className="text-left">{t('classroom.add-classroom')}</h1>
                        {statusMessage && (
                            statusMessage.type == 'success'
                                ? <div className="text-green-800 mb-4">{statusMessage.message}</div>
                                : <div className="text-red-800 mb-4">{statusMessage.message}</div>
                        )}
                        <AddClassroomForm
                            onSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            nameError={nameFormError}
                        />
                    </div>
                )
                : (<div>
                    <p className="text-center text-red-800">{t('classroom.unauthorized')}</p>
                </div>)
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