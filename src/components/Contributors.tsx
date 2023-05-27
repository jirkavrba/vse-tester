import { useContext, type FC } from "react";
import { ApplicationContext } from "../layout/ApplicationLayout";

export const Contributors: FC = () => {
    const { darkmode } = useContext(ApplicationContext);
    const names = [
        "Kreamis#4003",
        "Biting Palace#9378",
        "Lajtkek#2530",
        "Imposter Mr.Shadow#4225",
        "D'oh#0403",
        "dinoghost#8108",
        "ghoust#2295",
        "Starzor#7497",
        "Endru#9239",
        "GalileoM#2464",
        "jure01#5182",
        "Dreamery#9607"
    ].map(name => name.replace(" ", "\u00A0"));

    return (
        <footer className={`w-full lg:w-1/2 text-center mx-auto ${darkmode ? "text-neutral-300" : "text-neutral-700"}`}>
            Díky {
                names.map((name, i) => <strong key={i} className={darkmode ? "text-white" : "text-black"}>{name}</strong>).reduce((acc, current) => (<>{acc}, {current}</>))
            } za opravy chyb a doplnění otázek ❤️
        </footer>
    );
};
