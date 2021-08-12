import { FunctionComponent, useEffect, useState } from "react";
import { useWidth } from "../hooks/useWidth";
import Head from "next/head";
import MobileNav from "../components/MobileNav";
import BottomBar from "../components/BottomBar";
import DesktopNav from "../components/DesktopNav";
import Trends from "../components/Trends";

const Layout: FunctionComponent = ({ children }) => {
    const width = useWidth();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <noscript>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />
                </noscript>
            </Head>
            <div className="lg:flex">
                {width < 1024 ? <MobileNav /> : <DesktopNav />}
                {children}
                <BottomBar />
                <Trends />
            </div>
        </>
    );
};

export default Layout;
