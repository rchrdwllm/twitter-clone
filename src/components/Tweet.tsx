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
import { tweetInitialStates } from "../reducers/tweets";

const Tweet: FunctionComponent<TweetType> = ({
    author,
    content,
    date,
    id,
    likes,
    replies,
    retweets,
    edited,
}) => {
    const { buttonVariant } = useAnimations();
    const [session] = useSession();
    const router = useRouter();
    const [state, dispatch] = useReducer(tweets, tweetInitialStates);
    const [mounted, setMounted] = useState<boolean>(false);
    const [edit, setEdit] = useState<string | number>("");

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
                <div className="flex-grow overflow-hidden">
                    <div className="flex-grow flex items-center justify-between">
                        <div className="flex items-center whitespace-nowrap min-w-[0] max-w-[75%]">
                            <p className="font-emphasis">{author.name}</p>
                            &nbsp;
                            {author.email ? (
                                <p className="text-gray-600 truncate">
                                    {author.email}
                                </p>
                            ) : (
                                ""
                            )}
                            &nbsp;
                            <p className="text-gray-600 truncate">
                                · {date.month} {date.day}{" "}
                                {edited ? "· Edited" : ""}
                            </p>
                        </div>
                        {state.isAuthor ? (
                            <div className="flex items-center">
                                <button
                                    className="btn text-gray-500 hover:text-blue-500 pointer-events-auto"
                                    onClick={() =>
                                        dispatch({ type: "TOGGLE_OPTIONS" })
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
                    <motion.div
                        variants={buttonVariant}
                        initial="initial"
                        animate={state.toggleEdit ? "animate" : "initial"}
                        className="overflow-hidden h-0"
                    >
                        <div className="border-t mt-4 pt-3 pointer-events-auto flex space-x-5">
                            <textarea
                                className="block w-full border-none outline-none"
                                placeholder="Edit this Tweet"
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                                data-gramm_editor="false"
                            ></textarea>
                            <button
                                className="primary-btn w-auto text-base px-4 py-2"
                                disabled={!edit}
                                onClick={() => {
                                    dispatch({
                                        type: "EDIT_TWEET",
                                        payload: {
                                            id,
                                            editedContent: edit,
                                        },
                                    });

                                    setEdit("");

                                    dispatch({
                                        type: "TOGGLE_EDIT",
                                    });
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Link href={`/tweet/${id}`}>
                <a className="absolute top-0 left-0 w-full h-full transition-colors hover:bg-gray-50"></a>
            </Link>
            <motion.div
                variants={buttonVariant}
                initial="initial"
                animate={state.toggleOptions ? "animate" : "initial"}
                className="absolute z-10 top-12 right-4 bg-white rounded-lg shadow-md overflow-hidden"
            >
                <button
                    className="tweet-options-btn"
                    onClick={() =>
                        dispatch({
                            type: "DELETE_TWEET",
                            payload: { id },
                        })
                    }
                >
                    Delete Tweet
                </button>
                <button
                    className="tweet-options-btn"
                    onClick={() => {
                        dispatch({
                            type: "TOGGLE_EDIT",
                        });

                        dispatch({
                            type: "TOGGLE_OPTIONS",
                        });
                    }}
                >
                    Edit Tweet
                </button>
            </motion.div>
        </article>
    );
};

export default Tweet;
