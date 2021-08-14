import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import {
    PhotographIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    CalendarIcon,
} from "@heroicons/react/outline";
import { addTweet } from "../../components/TweetForm";
import { Session } from "next-auth";
import { useWidth } from "../../hooks/useWidth";

const ComposeTweet = () => {
    const [session] = useSession();
    const router = useRouter();
    const [content, setContent] = useState<string | number>("");
    const [mounted, setMounted] = useState<boolean>(false);
    const width = useWidth();

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        imagesLoaded(images, () => setMounted(true));
    }, []);

    if (!session) router.replace("/");

    if (width >= 1024) router.replace("/");

    return (
        <>
            <Head>
                <title>Compose new Tweet / Twitter</title>
            </Head>
            <header className="flex justify-between items-center p-4 py-3 border-b space-x-6">
                <Link href="/">
                    <a className="btn">
                        <ArrowLeftIcon className="btn-icon" />
                    </a>
                </Link>
                <button
                    className="primary-btn w-auto px-4 py-2"
                    onClick={() => {
                        addTweet(
                            content as string | number,
                            session as Session
                        );

                        setContent("");

                        router.push("/");
                    }}
                >
                    Tweet
                </button>
            </header>
            <div
                className={`${
                    router.pathname !== "/" ? "flex" : "hidden lg:flex border-b"
                } p-4 items-start space-x-4`}
            >
                <div className="min-w-max">
                    {session?.user?.image && (
                        <Image
                            className={`user-img transition-opacity ${
                                !mounted && "opacity-0"
                            }`}
                            alt="user icon"
                            src={session?.user?.image as any}
                            height={50}
                            width={50}
                            objectFit="contain"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/epfPQAIrwNEHKvToQAAAABJRU5ErkJggg=="
                        />
                    )}
                </div>
                <div className="flex-grow">
                    <form className="border-b">
                        <textarea
                            placeholder="What's happening?"
                            className="tweet-form-input block w-full border-none outline-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            data-gramm_editor="false"
                        ></textarea>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex-grow -ml-2">
                            <button className="btn p-2">
                                <PhotographIcon className="btn-icon" />
                            </button>
                            <button className="btn p-2">
                                <ChartBarIcon className="btn-icon" />
                            </button>
                            <button className="btn p-2">
                                <EmojiHappyIcon className="btn-icon" />
                            </button>
                            <button className="btn p-2">
                                <CalendarIcon className="btn-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComposeTweet;
