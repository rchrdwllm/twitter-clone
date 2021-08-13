import { FunctionComponent, useEffect, useState } from "react";
import { useWidth } from "../hooks/useWidth";
import MobileNav from "../components/MobileNav";
import BottomBar from "../components/BottomBar";
import DesktopNav from "../components/DesktopNav";
import Trends from "../components/Trends";
import Head from "next/head";

const Layout: FunctionComponent = ({ children }) => {
    const width = useWidth();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            <Head>
                <title>Twitter</title>
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
