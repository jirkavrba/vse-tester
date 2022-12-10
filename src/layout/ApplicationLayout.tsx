import { type FC, type ReactNode, createContext, useState } from "react";

interface ApplicationContextState {
    darkmode: boolean;
    setDarkmode: (previous: boolean) => void;
}

export const ApplicationContext = createContext<ApplicationContextState>({
    darkmode: false,
    setDarkmode: () => {},
});

interface ApplicationLayoutProps {
    children?: ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({
    children,
}: ApplicationLayoutProps) => {
    const [darkmode, setDarkmode] = useState<boolean>(false);

    return (
        <ApplicationContext.Provider value={{ darkmode, setDarkmode }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationLayout;
