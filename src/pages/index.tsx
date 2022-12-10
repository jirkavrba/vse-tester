import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { fetchQuestionSets } from "../lib/questions";
import { QuestionSet } from "../types";

interface HomeProps {
    sets: Array<QuestionSet>;
}

const Home: NextPage<HomeProps> = ({ sets }: HomeProps) => {
    return (
        <>
            <Head>
                <title>VŠE Tester</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold text-black">
                        VŠE Tester
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
                        {sets.map((set) => (
                            <Link href={`/tester/${set.subject}`} key={set.subject} className="flex flex-col p-10 bg-neutral-50 rounded-xl border border-neutral-300 cursor-pointer transition-all shadow hover:shadow-xl hover:border-blue-500">
                                <div className="font-bold tracking-wide text-sm text-black">{set.subject}</div>
                                <div className="text-blue-500 font-bold">{set.name}</div>
                                <div className="text-neutral-500 mt-4 text-sm">Obsahuje {set.questions.length} otázek</div>
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
