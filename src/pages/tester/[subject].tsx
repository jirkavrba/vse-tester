import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from "next";
import Head from "next/head";
import ApplicationLayout from "../../layout/ApplicationLayout";
import { fetchQuestionSets } from "../../lib/questions";
import type { Question, QuestionSet } from "../../types";

type TesterProps = QuestionSet;

const Tester: NextPage<TesterProps> = ({
    name,
    subject,
    multichoice,
    questions,
}: TesterProps) => {
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
            <ApplicationLayout>
                <div>{subject}</div>
                <div>{name}</div>
                <div>{multichoice ? "Multichoice" : "Single choice"}</div>
                <div>{JSON.stringify(questions)}</div>
            </ApplicationLayout>
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

export const getStaticProps: GetStaticProps<TesterProps> = async (
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

export default Tester;
