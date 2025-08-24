import AddClassroomForm from "@components/classroom/AddClassroomForm";
import Header from "@components/header";
import { User } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

const AddClassroomPage: React.FC = () => {
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, [])

    if (loggedInUser === null) {
        return <p>Loading...</p>;
    }

    const handleAddClassroom = () => {
        console.log("called add")
    }

    return (<>
        <Header />
        <main className="p-6">
            {loggedInUser && loggedInUser.role == 'admin'
                ? <div>
                    <AddClassroomForm onSubmit={handleAddClassroom} />
                </div>
                : <div>
                    <p className="text-red-800">{t('classroom.unauthorized')}</p>
                </div>
            }
        </main>
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