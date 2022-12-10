import type { FC, ReactNode } from "react";

interface ApplicationLayoutProps {
    children?: ReactNode;
}

const ApplicationLayout: FC<ApplicationLayoutProps> = ({
    children,
}: ApplicationLayoutProps) => {
    return <div>{children}</div>;
};

export default ApplicationLayout;
