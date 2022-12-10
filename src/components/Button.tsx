import React, { useContext } from "react";
import { ApplicationContext } from "../layout/ApplicationLayout";

export interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children = [],
    className = "",
    disabled = false,
    onClick,
}: ButtonProps) => {
    const { darkmode } = useContext(ApplicationContext);

    return (
        <button
            className={`${className} flex flex-row items-center justify-center rounded-lg py-5 text-sm font-bold uppercase tracking-wide transition 
             ${
                 disabled
                     ? darkmode
                         ? "bg-neutral-800 text-neutral-700"
                         : "bg-gray-200 text-gray-400"
                     : darkmode
                     ? "bg-neutral-700 text-white hover:bg-neutral-600"
                     : "bg-white text-black shadow hover:shadow-lg"
             }`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
