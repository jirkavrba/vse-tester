import { FaMoon, FaSun } from "react-icons/fa";
import Button from "./Button";

export interface DarkModeSwitchProps {
    dark: boolean,
    toggle: () => void
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ dark, toggle }: DarkModeSwitchProps) => {
    return (
        <Button onClick={toggle} className="p-5 ml-3">
            {dark ? <FaSun /> : <FaMoon />}
        </Button>
    );
};

export default DarkModeSwitch;