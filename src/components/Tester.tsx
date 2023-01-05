import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaCheck, FaRandom, FaUndo } from "react-icons/fa";
import { ApplicationContext } from "../layout/ApplicationLayout";
import { type Question, QuestionState } from "../types";
import Answer from "./Answer";
import Button from "./Button";
import Progress from "./Progress";
import QuestionsOverview from "./QuestionsOverview";

export interface TesterProps {
    title: string;
    multichoice: boolean;
    questions: Array<Question>;
}

const Tester: React.FC<TesterProps> = ({
    questions,
    multichoice,
    title,
}: TesterProps) => {
    const [revealed, setRevealed] = useState<boolean>(false);
    const [selected, setSelected] = useState<Array<string>>([]);
    const [index, setIndex] = useState<number>(0);
    const [states, setStates] = useState<Array<QuestionState>>([]);

    const { darkmode } = useContext(ApplicationContext);

    const key = `key_${(title ?? "").replace(/[^a-zA-Z0-9]+/, "-")}`;

    useEffect(() => {
        const defaultStates = [...new Array(questions.length)].fill([
            QuestionState.Unanswered,
        ]);

        // setIndex(Math.floor(Math.random() * questions.length));
        setRevealed(false);
        setStates(defaultStates);

        const stored = window.localStorage.getItem(key);

        if (stored !== null) {
            setStates(JSON.parse(stored));
        }

        document.title = title;
    }, [questions, title, key]);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * questions.length));
    }, [questions.length]);

    const question = questions[index % questions.length]!;

    const correct = states.filter(
        (state) => state === QuestionState.Correct
    ).length;
    const incorrect = states.filter(
        (state) => state === QuestionState.Incorrect
    ).length;

    const select = (correct: boolean, text: string): void => {
        if (revealed) {
            return;
        }

        if (multichoice) {
            if (selected.includes(text)) {
                setSelected((selected) =>
                    [...selected].filter((it) => it != text)
                );
                return;
            }

            setSelected((selected) => [...selected, text]);
            return;
        }

        setRevealed(true);
        setStates((states) => {
            const current = correct
                ? QuestionState.Correct
                : QuestionState.Incorrect;
            const copy = [...states];

            copy.splice(index, 1, current);
            window.localStorage.setItem(key, JSON.stringify(copy));

            return copy;
        });
    };

    const checkAnswers = () => {
        const correctAnswers = question.answers
            .filter((answer) => answer.correct)
            .map((answer) => answer.text);

        const incorrectAnswers = question.answers
            .filter((answer) => !answer.correct)
            .map((answer) => answer.text);

        const correct =
            selected.length === correctAnswers.length &&
            selected.every((answer) => correctAnswers.includes(answer)) &&
            selected.every((answer) => !incorrectAnswers.includes(answer));

        setRevealed(true);
        setSelected([]);
        setStates((states) => {
            const current = correct
                ? QuestionState.Correct
                : QuestionState.Incorrect;
            const copy = [...states];

            copy.splice(index, 1, current);
            window.localStorage.setItem(key, JSON.stringify(copy));

            return copy;
        });
    };

    const nextQuestion = () => {
        setIndex((index) => (index + 1) % questions.length);
        setRevealed(false);
    };

    const randomQuestion = () => {
        const remaining = states.every(
            (state) => state !== QuestionState.Unanswered
        )
            ? states.map((_, i) => i)
            : states
                  .map((state, i) =>
                      state !== QuestionState.Correct ? i : null
                  )
                  .filter((state) => state !== null);

        setIndex(remaining[Math.floor(Math.random() * remaining.length)] ?? 0);
        setRevealed(false);
    };

    const directQuestion = (index: number) => {
        setIndex(index);
        setRevealed(false);
    };

    const reset = () => {
        setRevealed(false);
        setIndex(Math.floor(Math.random() * questions.length));
        setStates(
            [...new Array(questions.length)].fill(QuestionState.Unanswered)
        );

        window.localStorage.removeItem(key);
    };

    return (
        <div
            className={`flex flex-grow flex-col items-stretch p-10 lg:flex-row ${
                darkmode ? "bg-neutral-900" : "bg-white"
            }`}
        >
            <div className="w-full md:w-1/2 xl:w-3/5 2xl:w-3/4">
                <h1
                    className={`${
                        darkmode ? "text-white" : "text-black"
                    } text-xl font-bold lg:text-3xl`}
                >
                    {question.text}
                </h1>
                <div className="mt-4 flex flex-col lg:mt-10">
                    {question.answers.map((answer, i) => (
                        <Answer
                            key={i}
                            text={answer.text}
                            correct={answer.correct}
                            revealed={revealed}
                            selected={selected.includes(answer.text)}
                            onSelect={select}
                        />
                    ))}
                </div>
            </div>
            <aside
                className={`${
                    darkmode ? "bg-neutral-800" : "bg-gray-200"
                } mt-5 ml-0 flex w-full flex-col rounded-xl p-5 md:ml-5 md:w-1/2 lg:mt-0 xl:w-2/5 2xl:w-1/4`}
            >
                <Progress
                    correct={correct}
                    incorrect={incorrect}
                    total={states.length}
                />
                <div className="flex-col">
                    {multichoice && (
                        <Button
                            disabled={selected.length === 0}
                            onClick={checkAnswers}
                            className="mt-3 mr-5 w-full text-center md:mr-0"
                        >
                            <FaCheck className="md:mr-5" />
                            <div className="hidden md:block">
                                Zkontrolovat odpovědi
                            </div>
                        </Button>
                    )}
                    <div className="flex flex-row md:flex-col">
                        <Button
                            disabled={!revealed}
                            onClick={nextQuestion}
                            className="mt-3 mr-5 w-full text-center md:mr-0"
                        >
                            <FaArrowRight className="md:mr-5" />
                            <div className="hidden md:block">Další otázka</div>
                        </Button>
                        <Button
                            disabled={!revealed}
                            onClick={randomQuestion}
                            className="mt-3 w-full text-center"
                        >
                            <FaRandom className="md:mr-5" />
                            <div className="hidden md:block">
                                Náhodná otázka
                            </div>
                        </Button>
                    </div>
                </div>
                <QuestionsOverview
                    questions={states}
                    selected={index}
                    onSelect={directQuestion}
                />
                <button
                    onClick={reset}
                    className="flex flex-row items-center justify-center text-sm font-bold uppercase tracking-widest text-neutral-700 transition hover:text-neutral-500"
                >
                    <FaUndo className="mr-2" />
                    Reset
                </button>
            </aside>
        </div>
    );
};

export default Tester;
