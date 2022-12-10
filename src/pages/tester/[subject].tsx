import fs from "fs";
import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from "next";
import Head from "next/head";
import ApplicationLayout from "../../components/ApplicationLayout";
import { Question } from "../../types";

interface TesterProps {
    name: string;
    subject: string;
    multichoice: boolean;
    questions: Array<Question>;
}

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
                <meta name="description" content={`Tester obsahuje ${questions.length} otázek`}/>
                <meta name="og:title" content={`VŠE Tester | ${subject} - ${name}`}/>
                <meta name="og:description" content={`Tester obsahuje ${questions.length} otázek`}/>
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
    const subjects = ["3sg201", "4it115", "4sa310", "4st204", "11f201"];
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
    const source = await import(`../../questions/${params?.subject}.json`);

    return {
        props: {
            name: source.name,
            subject: source.code,
            multichoice: source.multichoice,
            questions: source.questions,
        },
    };
};

export default Tester;
