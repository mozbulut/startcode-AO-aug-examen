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


    return (<>
        <Head>
            <title>{t('classroom.add')}</title>
        </Head>
        <Header />
        <main className="p-6 text-center">
            {loggedInUser && loggedInUser.role == 'admin'
                ? <div>
                    <h1>{t('classroom.add')}</h1>
                </div>
                : <div>
                    <p className="text-red-800">{t('classroom.not-authorized')}</p>
                </div>
            }
        </main>
    </>
    )
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