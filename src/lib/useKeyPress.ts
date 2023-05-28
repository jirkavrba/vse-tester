import { useEffect } from "react";

export const useKeyPress = (callback: () => void, keyCodes: Array<string>): void => {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            const { code } = event;

            if (keyCodes.includes(code)) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener("keydown", handler);
        return () => { window.removeEventListener("keydown", handler); };
    }, [keyCodes, callback]);
}