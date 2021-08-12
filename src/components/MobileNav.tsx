import Image from "next/image";
import Link from "next/link";
import {
    XIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    HashtagIcon,
    ViewListIcon,
    ChatAltIcon,
    BookmarkIcon,
    LightningBoltIcon,
    NewspaperIcon,
    ArrowLeftIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useAnimations } from "../hooks/useAnimations";

const MobileNav = () => {
    const [session] = useSession();
    const router = useRouter();
    const [shouldAnimate, setAnimate] = useState<boolean>(false);
    const { menuVariant } = useAnimations();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        imagesLoaded(images, () => setMounted(true));
    }, []);

    if (!session) return null;

    if (router.pathname !== "/") return null;

    return (
        <>
            <header className="sticky bg-white top-0 left-0 z-20 flex justify-between items-center p-4 py-3 border-b space-x-6">
                <Image
                    src={session.user?.image as any}
                    height={30}
                    width={30}
                    objectFit="contain"
                    className={`user-img cursor-pointer transition-opacity ${
                        !mounted && "opacity-0"
                    }`}
                    onClick={() => setAnimate(!shouldAnimate)}
                />
                <h1 className="font-bold text-xl flex-grow">Home</h1>
            </header>
            <motion.nav
                variants={menuVariant}
                initial="initial"
                animate={shouldAnimate ? "animate" : "initial"}
                className="fixed top-0 left-0 z-20 h-screen w-9/12 overflow-y-scroll bg-white"
            >
                <header className="flex justify-between items-center px-4 pr-3 py-3 border-b">
                    <h1 className="font-bold text-xl">Account info</h1>
                    <button
                        className="btn"
                        onClick={() => setAnimate(!shouldAnimate)}
                    >
                        <XIcon className="btn-icon" />
                    </button>
                </header>
                <div className="flex justify-between items-center p-4">
                    <Image
                        src={session.user?.image as any}
                        height={40}
                        width={40}
                        objectFit="contain"
                        className={`user-img transition-opacity ${
                            !mounted && "opacity-0"
                        }`}
                    />
                    <button className="btn hover:bg-none">
                        <DotsCircleHorizontalIcon className="btn-icon h-7" />
                    </button>
                </div>
                <div className="px-4">
                    <p className="font-bold">{session.user?.name}</p>
                    <p className="text-gray-500">{session.user?.email}</p>
                </div>
                <div className="flex space-x-7 text-gray-500 px-4 mt-4">
                    <p>
                        <span className="font-bold text-black">45</span>{" "}
                        following
                    </p>
                    <p>
                        <span className="font-bold text-black">45</span>{" "}
                        followers
                    </p>
                </div>
                <ul className="mt-2">
                    <li>
                        <a href="#" className="link-container">
                            <UserIcon className="link-icon" />
                            <span className="link-text">Profile</span>
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
                            <ChatAltIcon className="link-icon" />
                            <span className="link-text">Topics</span>
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
                            <LightningBoltIcon className="link-icon" />
                            <span className="link-text">Moments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="link-container">
                            <NewspaperIcon className="link-icon" />
                            <span className="link-text">Newsletters</span>
                        </a>
                    </li>
                </ul>
                <button
                    className="block w-full text-left p-4 border-t transition-colors hover:bg-gray-100"
                    onClick={() => signOut()}
                >
                    Log out
                </button>
            </motion.nav>
        </>
    );
};

export default MobileNav;
