import React, { useContext } from "react";
import { AppContext } from "../App";

export interface ButtonProps {
    onClick: () => void
    disabled?: boolean,
    className?: string,
    children?: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ children = [], className = "", disabled = false, onClick }: ButtonProps) => {
    const {darkmode} = useContext(AppContext);

    return (
        <button className={
            `${className} flex flex-row items-center justify-center font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition 
             ${disabled
                ? (darkmode ? 'bg-neutral-800 text-neutral-700' : 'bg-gray-200 text-gray-400')
                : (darkmode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'shadow hover:shadow-lg bg-white text-black')
             }`
        } disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;