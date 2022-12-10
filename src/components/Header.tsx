import { useContext } from "react";
import { AppContext } from "../App";

export interface HeaderProps {
    title: string,
    questionsCount: number,
    children: React.ReactNode,
}

const Header: React.FC<HeaderProps> = ({ title, questionsCount, children }: HeaderProps) => {
    const { darkmode } = useContext(AppContext);

    return (
        <header className={`flex flex-col lg:flex-row p-3 lg:p-10 ${darkmode ? 'bg-black' : 'bg-gray-200'} items-start`}>
            <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
                <h1 className={`text-center lg:text-left text-lg lg:text-3xl font-bold ${darkmode ? 'text-neutral-200' : 'text-black'}`}>{title}</h1>
                <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest lg:mt-3">Tester obsahuje {questionsCount} otázek</p>
            </div>

            <div className="mt-3 lg:mt-0 flex flex-grow flex-row items-center justify-center lg:justify-start w-full lg:w-auto">
                {children}
            </div>
        </header>
    )
}


export default Header;