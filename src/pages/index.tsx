import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { ApplicationContext } from "../layout/ApplicationLayout";
import { fetchQuestionSets } from "../lib/questions";
import type { QuestionSet } from "../types";

interface HomeProps {
    sets: Array<QuestionSet>;
}

const Home: NextPage<HomeProps> = ({ sets }: HomeProps) => {
    const subjects = sets.map((set) => set.subject);
    const { darkmode } = useContext(ApplicationContext);

    return (
        <>
            <Head>
                <title>VŠE Tester</title>
                <meta
                    name="description"
                    content={`Sady otázek k procvičování.\nTento build obsahuje předměty ${subjects.join(
                        ","
                    )}`}
                />
                <meta name="og:title" content="VŠE Tester" />
                <meta
                    name="og:description"
                    content={`Sady otázek k procvičování.\nTento build obsahuje předměty ${subjects.join(
                        ","
                    )}`}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                className={`flex min-h-screen flex-col items-center justify-center ${
                    darkmode ? "bg-black" : "bg-white"
                }`}
            >
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1
                        className={`text-5xl font-extrabold ${
                            darkmode ? "text-white" : "text-black"
                        }`}
                    >
                        VŠE Tester
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
                        {sets.map((set) => (
                            <Link
                                href={`/tester/${set.subject}`}
                                key={set.subject}
                                className={`flex cursor-pointer flex-col rounded-xl border ${
                                    darkmode
                                        ? "border-neutral-700 bg-neutral-800"
                                        : "border-neutral-300 bg-neutral-50 "
                                } p-10 shadow transition-all hover:border-blue-500 hover:shadow-xl`}
                            >
                                <div
                                    className={`text-sm font-bold tracking-wide ${
                                        darkmode ? "text-white" : "text-black"
                                    }`}
                                >
                                    {set.subject}
                                </div>
                                <div className="font-bold text-blue-500">
                                    {set.name}
                                </div>
                                <div className="mt-4 text-sm text-neutral-500">
                                    Obsahuje {set.questions.length} otázek
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* TODO: Contributors component */}
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const sets = await fetchQuestionSets();

    return {
        props: {
            sets,
        },
    };
};

export default Home;
