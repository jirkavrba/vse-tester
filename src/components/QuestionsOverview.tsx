import { useContext } from "react";
import { ApplicationContext } from "../layout/ApplicationLayout";
import { QuestionState } from "../types";

export interface QuestionsOverviewProps {
    questions: Array<QuestionState>;
    selected: number;
    onSelect: (index: number) => void;
}

interface QuestionSquareProps {
    state: QuestionState;
    index: number;
    active: boolean;
    onSelect: (index: number) => void;
}

const QuestionSquare: React.FC<QuestionSquareProps> = ({
    state,
    index,
    active,
    onSelect,
}: QuestionSquareProps) => {
    const { darkmode } = useContext(ApplicationContext);
    const classes = {
        [QuestionState.Correct]: `bg-green-500 hover:bg-green-400 ${
            darkmode ? "ring-green-300" : "ring-green-700"
        }`,
        [QuestionState.Incorrect]: `bg-red-500 hover:bg-red-400 ${
            darkmode ? "ring-red-300" : "ring-red-800"
        }`,
        [QuestionState.Unanswered]: darkmode
            ? "bg-neutral-700 hover:bg-neutral-500 text-neutral-400 ring-neutral-500"
            : "bg-gray-300 hover:bg-gray-500 ring-neutral-600",
    };

    return (
        <div
            onClick={() => onSelect(index)}
            className={`m-1 flex h-4 w-4 cursor-pointer flex-col items-center justify-center rounded font-mono text-xs font-bold transition ${
                active ? "ring-2" : ""
            } ${classes[state]}`}
        />
    );
};

const QuestionsOverview: React.FC<QuestionsOverviewProps> = ({
    questions,
    selected,
    onSelect,
}: QuestionsOverviewProps) => {
    return (
        <div className="mt-5 flex flex-grow flex-row flex-wrap content-start items-start justify-start">
            {questions.map((state, i) => (
                <QuestionSquare
                    key={i}
                    index={i}
                    state={state}
                    active={selected === i}
                    onSelect={(index) => onSelect(index)}
                />
            ))}
        </div>
    );
};

export default QuestionsOverview;
