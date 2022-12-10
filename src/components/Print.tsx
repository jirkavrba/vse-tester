import { FaArrowLeft, FaBackward, FaCheckCircle, FaCross } from "react-icons/fa";
import { QuestionSet } from "../types";
import Button from "./Button";

export interface PrintProperties {
    questionSet: QuestionSet,
    onClose: () => void
}

const Print: React.FC<PrintProperties> = ({ questionSet, onClose }: PrintProperties) => {
    return (
        <div className="flex flex-col p-10">
            <header className="flex flex-row justify-between items-start">
                <div>
                    <h2 className="text-gray-500 font-mono font-bold text-xl tracking-wider">{questionSet.subject}</h2>
                    <h1 className="font-black text-3xl">{questionSet.title}</h1>
                </div>
                <Button className="px-5 print:hidden" onClick={onClose}>
                    <FaArrowLeft />
                </Button>
            </header>
            <hr className="my-5" />
            <main>
                {questionSet.questions.map((question, i) =>
                    <div key={i} className="mb-3 break-inside-avoid-page">
                        <h1 className="text-sm font-bold mb-2">{question.text}</h1>
                        <ul>
                            {question.answers.map((answer, j) => 
                                <li key={j} className={`flex flex-row text-xs items-center mb-1 px-5 py-2 rounded-lg font-bold ${answer.correct ? "bg-green-100 text-green-700" : "text-gray-500"}`}>
                                    {answer.text}
                                    {answer.correct && <FaCheckCircle className="ml-2"/> }
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Print;