import Header from "@components/header";
import { User } from "@types";
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
            <title>Add classroom</title>
        </Head>
        <Header />
        <main>
            {loggedInUser && loggedInUser.role === 'admin'
                ? <p>admin</p>
                : <p>not admin</p>
            }
        </main>
    </>
    )
}

export default AddClassroomPage;