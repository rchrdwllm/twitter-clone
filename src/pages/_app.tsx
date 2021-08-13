import "../styles/globalStyles.css";
import "../styles/fonts/style.css";
import Layout from "./layout";
import Router from "next/router";
import { Provider } from "next-auth/client";
import { AppComponent } from "next/dist/next-server/lib/router/router";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
    size: 2,
    color: "#3b82f6",
    className: "bar-of-progress",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const App: AppComponent = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default App;
