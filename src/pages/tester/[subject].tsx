import fs from "fs";
import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    NextPage,
} from "next";
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
        <ApplicationLayout>
            <div>{subject}</div>
        </ApplicationLayout>
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

    return {
        props: {
            name: "",
            subject: "",
            multichoice: false,
            questions: [],
        },
    };
};

export default Tester;
