import {
    UserIcon,
    HashtagIcon,
    ViewListIcon,
    BookmarkIcon,
    BellIcon,
    MailIcon,
    HomeIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAnimations } from "../hooks/useAnimations";
import { useRouter } from "next/dist/client/router";

const DesktopNav = () => {
    const [session] = useSession();
    const router = useRouter();
    const [shouldAnimate, setAnimate] = useState<boolean>(false);
    const { buttonVariant } = useAnimations();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        imagesLoaded(images, () => setMounted(true));
    }, []);

    if (!session) return null;

    return (
        <nav className="sticky top-0 h-screen border-r pl-10 pr-8 pt-4 pb-8">
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="text-blue-500 h-7 fill-current r-13gxpu9 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-64lmo0"
            >
                <g>
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
            </svg>
            <ul className="mt-2">
                <li>
                    <Link href="/">
                        <a
                            className={`link-container ${
                                router.pathname === "/" && "active"
                            }`}
                        >
                            <HomeIcon className="link-icon" />
                            <span className="link-text">Home</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <HashtagIcon className="link-icon" />
                        <span className="link-text">Explore</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <BellIcon className="link-icon" />
                        <span className="link-text">Notifications</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <MailIcon className="link-icon" />
                        <span className="link-text">Messages</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <BookmarkIcon className="link-icon" />
                        <span className="link-text">Bookmarks</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <ViewListIcon className="link-icon" />
                        <span className="link-text">Lists</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <UserIcon className="link-icon" />
                        <span className="link-text">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="link-container">
                        <DotsCircleHorizontalIcon className="link-icon" />
                        <span className="link-text">More</span>
                    </a>
                </li>
            </ul>
            <button
                className="primary-btn mt-2"
                onClick={() => {
                    router.push("/");

                    if (router.pathname === "/") {
                        (
                            document.querySelector(
                                ".tweet-form-input"
                            ) as HTMLTextAreaElement
                        ).focus();
                    }
                }}
            >
                Tweet
            </button>
            <div className="relative mt-8 text-left flex items-center space-x-2 rounded-full p-2 pr-0 transition-colors hover:bg-blue-100">
                <div className="min-w-max flex items-center">
                    <Image
                        className={`user-img transition-opacity ${
                            !mounted && "opacity-0"
                        }`}
                        src={session?.user?.image as any}
                        height={40}
                        width={40}
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/epfPQAIrwNEHKvToQAAAABJRU5ErkJggg=="
                    />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold whitespace-nowrap">
                        {session?.user?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {session?.user?.email}
                    </p>
                </div>
                <button
                    className="btn text-gray-500 hover:text-blue-500"
                    onClick={() => setAnimate(!shouldAnimate)}
                >
                    <DotsHorizontalIcon className="btn-icon" />
                </button>
                <motion.div
                    variants={buttonVariant}
                    initial="initial"
                    animate={shouldAnimate ? "animate" : "initial"}
                    className="absolute -top-8 right-0 bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <button
                        onClick={() =>
                            signOut({ callbackUrl: window.location.origin })
                        }
                        className="border-none outline-none py-2 px-4 transition-colors hover:bg-blue-100 hover:text-blue-500"
                    >
                        Log out
                    </button>
                </motion.div>
            </div>
        </nav>
    );
};

export default DesktopNav;
