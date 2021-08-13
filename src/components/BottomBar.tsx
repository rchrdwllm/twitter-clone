import {
    HomeIcon,
    SearchIcon,
    BellIcon,
    MailIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const BottomBar = () => {
    const [session] = useSession();
    const router = useRouter();

    if (!session) return null;

    if (router.pathname !== "/") return null;

    return (
        <nav className="fixed lg:hidden bg-white z-10 bottom-0 flex justify-between items-center w-full py-2 px-12 border-t">
            <Link href="/">
                <a
                    className={`link-container text-gray-500 rounded-full p-2 ${
                        router.pathname === "/" && "active"
                    }`}
                >
                    <HomeIcon className="link-icon" />
                </a>
            </Link>
            <Link href="/">
                <a className="link-container text-gray-500 rounded-full p-2">
                    <SearchIcon className="link-icon" />
                </a>
            </Link>
            <Link href="/">
                <a className="link-container text-gray-500 rounded-full p-2">
                    <BellIcon className="link-icon" />
                </a>
            </Link>
            <Link href="/">
                <a className="link-container text-gray-500 rounded-full p-2">
                    <MailIcon className="link-icon" />
                </a>
            </Link>
        </nav>
    );
};

export default BottomBar;
