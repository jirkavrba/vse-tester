import { useContext } from "react";
import { AppContext } from "../App";

export interface ProgressProps {
    correct: number,
    incorrect: number,
    total: number,
}

const Progress: React.FC<ProgressProps> = ({ correct, incorrect, total }: ProgressProps) => {
    const { darkmode } = useContext(AppContext);
    const percentage = Math.floor(correct * 100 / Math.max(1, correct + incorrect));
    const progress = (correct + incorrect) * 100 / total;

    return (
        <div className="flex flex-col">
            <div className={`${darkmode ? "bg-neutral-900" : "bg-white"} flex flex-row items-center justify-between rounded-lg p-5 font-bold`}>
                <h1 className={`${darkmode ? "text-white" : "text-black"} text-xl lg:text-3xl flex-grow`}>{percentage}&nbsp;%</h1>
                <span className="text-green-500 text-sm lg:text-lg">{correct} správně</span>
                <span className="text-neutral-600 mx-2 lg:mx-3 text-sm lg:text-lg">/</span>
                <span className="text-red-500 text-sm lg:text-lg">{incorrect} špatně</span>
            </div>

            <div className={`${darkmode ? "bg-neutral-900" : "bg-white"} h-2 rounded-lg relative mt-2`} title={`${Math.floor(progress * 100) / 100}%`}>  
                <div className="absolute left-0 top-0 h-2 bg-blue-500 rounded-lg transition-all" style={{ width: `${progress}%`}}></div>
            </div>
        </div>
    );
}

export default Progress;