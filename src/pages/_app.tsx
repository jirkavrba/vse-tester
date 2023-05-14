import { type AppType } from "next/dist/shared/lib/utils";
import ApplicationLayout from "../layout/ApplicationLayout";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApplicationLayout>
            <Component {...pageProps} />
            <Analytics/>
        </ApplicationLayout>
    );
};

export default MyApp;
