import {
    type FC,
    type ReactNode,
    createContext,
    useState,
    useEffect,
} from "react";

interface ApplicationContextState {
    darkmode: boolean;
    setDarkmode: (previous: boolean) => void;
}

export const ApplicationContext = createContext<ApplicationContextState>({
    darkmode: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setDarkmode: () => {},
});

interface ApplicationLayoutProps {
    children?: ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({
    children,
}: ApplicationLayoutProps) => {
    const [darkmode, setDarkmode] = useState<boolean>(false);

    const storeDarkmode = (dark: boolean) => {
        window.localStorage.setItem("theme", dark ? "dark-mode" : "light-mode");
    };

    const setDarkmodePersisting = (dark: boolean) => {
        setDarkmode(dark);
        storeDarkmode(dark);
    };

    useEffect(() => {
        const dark = window.localStorage.getItem("theme") !== "light-mode";

        setDarkmode(dark);
        storeDarkmode(dark);
    }, []);

    return (
        <ApplicationContext.Provider
            value={{ darkmode, setDarkmode: setDarkmodePersisting }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationLayout;
