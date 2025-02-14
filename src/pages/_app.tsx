import { type AppType } from "next/dist/shared/lib/utils";
import ApplicationLayout from "../layout/ApplicationLayout";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApplicationLayout>
            <Component {...pageProps} />
            <script defer src="https://umami.vrba.dev/script.js" data-website-id="106eada3-7938-4cad-b6c0-6923f498e4a1"></script>
        </ApplicationLayout>
    );
};

export default MyApp;
