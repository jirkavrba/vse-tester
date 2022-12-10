import { type AppType } from "next/dist/shared/lib/utils";
import ApplicationLayout from "../layout/ApplicationLayout";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApplicationLayout>
            <Component {...pageProps} />
        </ApplicationLayout>
    );
};

export default MyApp;
