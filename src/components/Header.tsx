import Link from "next/link";
import { useContext } from "react";
import { FaArrowLeft, FaBackward } from "react-icons/fa";
import { ApplicationContext } from "../layout/ApplicationLayout";
import DarkModeSwitch from "./DarkModeSwitch";

export interface HeaderProps {
    title: string;
    questionsCount: number;
}

const Header: React.FC<HeaderProps> = ({
    title,
    questionsCount,
}: HeaderProps) => {
    const { darkmode, setDarkmode } = useContext(ApplicationContext);

    return (
        <header
            className={`flex flex-col p-3 lg:flex-row lg:p-10 ${
                darkmode ? "bg-black" : "bg-gray-200"
            } items-start`}
        >
            <div className="flex w-full flex-row items-start justify-between">
                <div className="flex w-full flex-col items-center lg:w-auto lg:items-start">
                    <Link href={"/"} className={`flex flex-row items-center gap-2 mb-4 uppercase text-sm tracking-widest font-bold transition-all ${darkmode ? "text-neutral-700 hover:text-white" : "text-neutral-400 hover:text-black"}`}>
                        <FaArrowLeft /> Zpět na výběr předmětu
                    </Link>
                    <h1
                        className={`text-center text-lg font-bold lg:text-left lg:text-3xl ${
                            darkmode ? "text-neutral-200" : "text-black"
                        }`}
                    >
                        {title}
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 lg:mt-3">
                        Tester obsahuje {questionsCount} otázek
                    </p>
                </div>
            </div>
            <div className="">
                <DarkModeSwitch
                    dark={darkmode}
                    toggle={() => setDarkmode(!darkmode)}
                />
            </div>
        </header>
    );
};

export default Header;
