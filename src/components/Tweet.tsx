import Link from "next/link";
import Image from "next/image";
import {
    ChatIcon,
    RefreshIcon,
    HeartIcon,
    UploadIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { FunctionComponent, useState, useEffect, useReducer } from "react";
import { Tweet as TweetType, tweets } from "../reducers/tweets";
import { motion } from "framer-motion";
import { useAnimations } from "../hooks/useAnimations";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Tweet: FunctionComponent<TweetType> = ({
    author,
    content,
    date,
    id,
    likes,
    replies,
    retweets,
}) => {
    const { buttonVariant } = useAnimations();
    const [session] = useSession();
    const router = useRouter();
    const [state, dispatch] = useReducer(tweets, {
        isAuthor: false,
        liked: false,
        retweeted: false,
        toggleDelete: false,
    });
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        if (session) {
            dispatch({
                type: "INITIALIZE",
                payload: { session, email: author.email, likes, retweets },
            });
        } else {
            dispatch({ type: "INITIALIZE", payload: {} });
        }
    }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        imagesLoaded(images, () => setMounted(true));
    }, []);

    return (
        <article
            className={`relative border-b transition-opacity ${
                !mounted && "opacity-0"
            }`}
        >
            <div className="relative z-10 p-4 flex items-start space-x-4 pointer-events-none">
                <div className="min-w-max">
                    <Image
                        className="user-img"
                        src={author.image as any}
                        height={50}
                        width={50}
                        objectFit="contain"
                        loading="lazy"
                        placeholder="blur"
                        alt="user icon"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/epfPQAIrwNEHKvToQAAAABJRU5ErkJggg=="
                    />
                </div>
                <div className="flex-grow">
                    <div className="flex-grow flex items-center">
                        <p className="font-bold">{author.name}</p>
                        &nbsp;
                        {author.email ? (
                            <p className="text-gray-600 max-w-[4rem] lg:w-20 truncate">
                                {author.email}
                            </p>
                        ) : (
                            ""
                        )}
                        &nbsp;
                        <p className="text-gray-600">
                            · {date.month} {date.day}
                        </p>
                        {state.isAuthor ? (
                            <div className="flex-grow flex justify-end">
                                <button
                                    className="btn text-gray-500 hover:text-blue-500 pointer-events-auto"
                                    onClick={() =>
                                        dispatch({ type: "TOGGLE_DELETE" })
                                    }
                                >
                                    <DotsHorizontalIcon className="btn-icon" />
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <p>{content}</p>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="btn flex space-x-1 items-center pointer-events-auto text-gray-500 hover:text-blue-500"
                            onClick={() => {
                                router.push(`/tweet/${id}`);
                            }}
                        >
                            <ChatIcon className="btn-icon" />
                            {replies.length ? (
                                <span>{replies.length}</span>
                            ) : (
                                ""
                            )}
                        </button>
                        <button
                            className={`btn flex space-x-1 items-center pointer-events-auto hover:text-green-500 hover:bg-green-100 ${
                                state.retweeted
                                    ? "text-green-500"
                                    : "text-gray-500"
                            }`}
                            onClick={() =>
                                dispatch({
                                    type: "RETWEET_TWEET",
                                    payload: {
                                        session,
                                        retweets,
                                        id,
                                    },
                                })
                            }
                        >
                            <RefreshIcon className="btn-icon" />
                            {retweets.length ? (
                                <span>{retweets.length}</span>
                            ) : (
                                ""
                            )}
                        </button>
                        <button
                            className={`btn flex space-x-1 items-center pointer-events-auto hover:text-red-500 hover:bg-red-100 ${
                                state.liked ? "text-red-500" : "text-gray-500"
                            }`}
                            onClick={() =>
                                dispatch({
                                    type: "LIKE_TWEET",
                                    payload: {
                                        session,
                                        likes,
                                        id,
                                    },
                                })
                            }
                        >
                            <HeartIcon className="btn-icon" />
                            {likes.length ? <span>{likes.length}</span> : ""}
                        </button>
                        <button className="btn pointer-events-auto text-gray-500 hover:text-blue-500">
                            <UploadIcon className="btn-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <Link href={`/tweet/${id}`}>
                <a className="absolute top-0 left-0 w-full h-full transition-colors hover:bg-gray-50"></a>
            </Link>
            <motion.div
                variants={buttonVariant}
                initial="initial"
                animate={state.toggleDelete ? "animate" : "initial"}
                className="absolute z-10 top-12 right-4 bg-white rounded-lg shadow-md overflow-hidden"
            >
                <button
                    className="border-none outline-none py-2 px-4 transition-colors hover:bg-blue-100 hover:text-blue-500"
                    onClick={() =>
                        dispatch({
                            type: "DELETE_TWEET",
                            payload: { id },
                        })
                    }
                >
                    Delete Tweet
                </button>
            </motion.div>
        </article>
    );
};

export default Tweet;
