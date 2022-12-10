import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Tester from "../../components/Tester";
import { fetchQuestionSets } from "../../lib/questions";
import type { QuestionSet } from "../../types";

type TesterPageProps = QuestionSet;

const TesterPage: NextPage<TesterPageProps> = ({
    name,
    subject,
    multichoice,
    questions,
}: TesterPageProps) => {
    return (
        <>
            <Head>
                <title>{`VŠE Tester | ${subject} - ${name}`}</title>
                <meta
                    name="description"
                    content={`Tester obsahuje ${questions.length} otázek`}
                />
                <meta
                    name="og:title"
                    content={`VŠE Tester | ${subject} - ${name}`}
                />
                <meta
                    name="og:description"
                    content={`Tester obsahuje ${questions.length} otázek`}
                />
            </Head>
            <main className="flex min-h-screen flex-col">
                <Header title={name} questionsCount={questions.length} />
                <Tester
                    title={name}
                    multichoice={multichoice}
                    questions={questions}
                />
            </main>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const sets = await fetchQuestionSets();
    const subjects = sets.map((set) => set.subject);
    const paths = subjects.map((code) => {
        return {
            params: { subject: code },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<TesterPageProps> = async (
    context: GetStaticPropsContext
) => {
    const { params } = context;
    const sets = await fetchQuestionSets();
    const source = sets.find((set) => set.subject === params?.subject)!;

    return {
        props: {
            ...source,
        },
    };
};

export default TesterPage;
