import Header from '@components/header';
import TeacherOverview from '@components/teachers/TeacherOverview';
import TeacherService from '@services/TeacherService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

const Teachers: React.FC = () => {
  const { t } = useTranslation();

  const fetcher = async (key: string) => {
    const res = await TeacherService.getAllTeachers();

    return res.json();
  };

  const { data, isLoading, error } = useSWR('Teachers', fetcher);

  return (
    <>
      <Head>
        <title>{t('teacher.title')}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>{t('teacher.title')}</h1>

        <section className="mt-5">
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <p>{t('general.loading')}</p>}
          {data && <TeacherOverview teachers={data} />}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Teachers;
