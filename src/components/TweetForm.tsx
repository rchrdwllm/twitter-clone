import Image from "next/image";
import { useSession } from "next-auth/client";
import {
    PhotographIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    CalendarIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Tweet } from "../reducers/tweets";
import { v4 } from "uuid";
import firebase from "../../firebase";
import { Session } from "next-auth";

export const addTweet = (content: string | number, session: Session) => {
    const month = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(new Date());
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const currentHour = Math.abs(
        new Date().getHours() >= 12
            ? new Date().getHours() - 12
            : new Date().getHours()
    );
    const minutes = new Date().getMinutes();
    const id = v4();

    const newTweet: Tweet = {
        type: "tweet",
        content,
        likes: [],
        retweets: [],
        replies: [],
        id: id,
        date: {
            dateId: Date.now(),
            month: month,
            day: day,
            year: year,
            dateTweeted: `${currentHour === 0 ? "12" : currentHour}:${
                minutes < 10 ? "0" + minutes : minutes
            }`,
        },
        author: {
            email: session?.user?.email as string,
            image: session?.user?.image as string,
            name: session?.user?.name as string,
        },
    };

    firebase.firestore().collection("tweets").doc(id).set(newTweet);
};

const TweetForm = () => {
    const [session] = useSession();
    const [content, setContent] = useState<string | number>("");
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        imagesLoaded(images, () => setMounted(true));
    }, []);

    return (
        <div className="hidden lg:flex border-b p-4 items-start space-x-4">
            <div className="min-w-max">
                {session?.user?.image && (
                    <Image
                        className={`user-img transition-opacity ${
                            !mounted && "opacity-0"
                        }`}
                        src={session?.user?.image as any}
                        height={50}
                        width={50}
                        objectFit="contain"
                        loading="lazy"
                        placeholder="blur"
                        alt="user icon"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/epfPQAIrwNEHKvToQAAAABJRU5ErkJggg=="
                    />
                )}
            </div>
            <div className="flex-grow">
                <form className="border-b">
                    <textarea
                        placeholder="What's happening?"
                        className="tweet-form-input block w-full border-none outline-none text-xl"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                    <button
                        className="hidden lg:block primary-btn w-auto text-base px-4 py-2"
                        disabled={!content}
                        onClick={() => {
                            addTweet(
                                content as string | number,
                                session as Session
                            );

                            setContent("");
                        }}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TweetForm;
