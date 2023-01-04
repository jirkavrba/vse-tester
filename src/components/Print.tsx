import {
    FaArrowLeft,
    FaBackward,
    FaCheckCircle,
    FaCross,
} from "react-icons/fa";
import { QuestionSet } from "../types";
import Button from "./Button";

export interface PrintProperties {
    questionSet: QuestionSet;
    onClose: () => void;
}

const Print: React.FC<PrintProperties> = ({
    questionSet,
    onClose,
}: PrintProperties) => {
    return (
        <div className="flex flex-col p-10">
            <header className="flex flex-row items-start justify-between">
                <div>
                    <h2 className="font-mono text-xl font-bold tracking-wider text-gray-500">
                        {questionSet.subject}
                    </h2>
                    <h1 className="text-3xl font-black">{questionSet.name}</h1>
                </div>
                <Button className="px-5 print:hidden" onClick={onClose}>
                    <FaArrowLeft />
                </Button>
            </header>
            <hr className="my-5" />
            <main>
                {questionSet.questions.map((question, i) => (
                    <div key={i} className="mb-3 break-inside-avoid-page">
                        <h1 className="mb-2 text-sm font-bold">
                            {question.text}
                        </h1>
                        <ul>
                            {question.answers.map((answer, j) => (
                                <li
                                    key={j}
                                    className={`mb-1 flex flex-row items-center rounded-lg px-5 py-2 text-xs font-bold ${
                                        answer.correct
                                            ? "bg-green-100 text-green-700"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {answer.text}
                                    {answer.correct && (
                                        <FaCheckCircle className="ml-2" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Print;
