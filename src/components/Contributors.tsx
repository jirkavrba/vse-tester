import { useContext, type FC } from "react";
import { ApplicationContext } from "../layout/ApplicationLayout";

type ContributorsProps = {
    names: Array<string>,
};

export const Contributors: FC<ContributorsProps> = ({ names }: ContributorsProps) => {
    const { darkmode } = useContext(ApplicationContext);

    return (
        <footer className={`${darkmode ? "text-white" : "text-black"}`}>
            Díky {
                names.map((name, i) => <strong key={i} className="text-blue-500">{name}</strong>).reduce((acc, current) => (<>{acc}, {current}</>))
            } za opravy chyb a doplnění otázek ♡ 
        </footer>
    );
};