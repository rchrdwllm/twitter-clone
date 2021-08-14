import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import {
    ArrowLeftIcon,
    DotsHorizontalIcon,
    ChatIcon,
    RefreshIcon,
    HeartIcon,
    UploadIcon,
} from "@heroicons/react/outline";
import { useReducer, useState, useEffect, useRef } from "react";
import Tweet from "../../components/Tweet";
import { Tweet as TweetType } from "../../reducers/tweets";
import firebase from "../../../firebase";
import { tweets } from "../../reducers/tweets";
import { useSession } from "next-auth/client";
import { v4 } from "uuid";
import { useCollection } from "react-firebase-hooks/firestore";
import { MutableRefObject } from "react";
import { motion } from "framer-motion";
import { useAnimations } from "../../hooks/useAnimations";
import Loader from "../../components/Loader";
import { tweetInitialStates } from "../../reducers/tweets";

const TweetDetails = ({ initialId }: { initialId: any }) => {
    const router = useRouter();
    const [session] = useSession();
    const { id } = router.query;
    const [tweet, setTweet] = useState<TweetType | null>(null);
    const [state, dispatch] = useReducer(tweets, tweetInitialStates);
    const [reply, setReply] = useState<string | number>("");
    const [tweetsCollection, tweetsLoading] = useCollection(
        firebase.firestore().collection("tweets").orderBy("date", "desc"),
        {}
    );
    const [replies, setReplies] = useState<TweetType[] | null>(null);
    const [edit, setEdit] = useState<string | number>("");
    const replyInput: MutableRefObject<null | HTMLTextAreaElement> =
        useRef<null | HTMLTextAreaElement>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const { buttonVariant } = useAnimations();

    useEffect(() => {
        if (session) {
            if (tweet) {
                dispatch({
                    type: "INITIALIZE",
                    payload: {
                        session,
                        email: tweet.author.email,
                        likes: tweet.likes,
                        retweets: tweet.retweets,
                    },
                });
            } else {
                dispatch({ type: "INITIALIZE", payload: {} });
            }
        } else {
            dispatch({ type: "INITIALIZE", payload: {} });
        }
    }, [session, tweet]);

    useEffect(() => {
        if (!tweetsLoading && tweetsCollection) {
            const imagesLoaded = require("imagesloaded");
            const images = document.querySelectorAll("img");
            const filteredTweets = tweetsCollection.docs.map(
                (doc) => doc.data() as TweetType
            );
            const replies = filteredTweets.filter(
                ({ type }) => type === "reply"
            );

            const filteredReplies = replies.filter(({ id }) =>
                tweet?.replies.includes(id)
            );

            setReplies(filteredReplies);

            imagesLoaded(images, () => setMounted(true));
        }
    }, [tweetsCollection]); // eslint-disable-line react-hooks/exhaustive-deps

    const addReply = () => {
        const month = new Intl.DateTimeFormat("en-US", {
            month: "long",
        }).format(new Date());
        const day = new Date().getDate();
        const year = new Date().getFullYear();
        const currentHour = Math.abs(new Date().getHours() - 12);
        const minutes = new Date().getMinutes();
        const replyId = v4();

        const newReply: TweetType = {
            type: "reply",
            content: reply,
            likes: [],
            retweets: [],
            replies: [],
            id: replyId,
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
            edited: false,
        };

        tweet?.replies.unshift(replyId);

        firebase.firestore().collection("tweets").doc(replyId).set(newReply);
        firebase
            .firestore()
            .collection("tweets")
            .doc(id as string)
            .update({
                replies: tweet?.replies,
            });
    };

    const getTweet = () => {
        firebase
            .firestore()
            .collection("tweets")
            .doc(id as string)
            .get()
            .then((snapshot) => setTweet(snapshot.data() as TweetType));
    };

    if (!tweet || !tweet.author) {
        getTweet();

        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    if (!session) router.replace("/");

    return (
        <>
            <Head>
                <title>
                    {tweet.author.name} on Twitter: &quot;{tweet.content}&quot;
                    / Twitter
                </title>
            </Head>
            <div className="flex-grow">
                <header className="sticky top-0 z-10 bg-white flex items-center p-4 py-3 border-b space-x-4">
                    <button className="btn" onClick={() => router.back()}>
                        <ArrowLeftIcon className="btn-icon" />
                    </button>
                    <h1 className="font-bold text-xl flex-grow">Thread</h1>
                </header>
                <main
                    className={`relative p-4 border-b ${
                        !mounted && "opacity-0"
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className="min-w-max flex items-center">
                            {tweet.author.image ? (
                                <Image
                                    src={tweet.author.image as string}
                                    height={50}
                                    width={50}
                                    objectFit="contain"
                                    className="user-img"
                                    alt="user icon"
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{tweet.author.name}</p>
                            <p className="text-gray-500">
                                {tweet.author.email}
                            </p>
                        </div>
                        {state.isAuthor ? (
                            <button
                                className="btn self-start text-gray-500 hover:text-blue-500"
                                onClick={() =>
                                    dispatch({ type: "TOGGLE_OPTIONS" })
                                }
                            >
                                <DotsHorizontalIcon className="btn-icon" />
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    <p className="text-2xl mt-4">{tweet.content}</p>
                    <p className="text-gray-500 mt-2">
                        {tweet.date.dateTweeted} · {tweet.date.month},{" "}
                        {tweet.date.day} {tweet.date.year}{" "}
                        {tweet.edited ? "· Edited" : ""}
                    </p>
                    {tweet.retweets.length || tweet.likes.length ? (
                        <div className="mt-4 text-gray-500 flex items-center space-x-5 border-t pt-3">
                            {tweet.retweets.length ? (
                                <p>
                                    <span className="font-semibold text-black">
                                        {tweet.retweets.length}
                                    </span>{" "}
                                    retweets
                                </p>
                            ) : (
                                ""
                            )}
                            {tweet.likes.length ? (
                                <p>
                                    <span className="font-semibold text-black">
                                        {tweet.likes.length}
                                    </span>{" "}
                                    likes
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="border-t py-3 px-4 mt-3 flex items-center justify-between lg:px-12">
                        <button
                            className="btn text-gray-500 hover:text-blue-500"
                            onClick={() => replyInput.current?.focus()}
                        >
                            <ChatIcon className="btn-icon h-7" />
                        </button>
                        <button
                            className={`btn hover:text-green-500 hover:bg-green-100 ${
                                state.retweeted
                                    ? "text-green-500"
                                    : "text-gray-500"
                            }`}
                            onClick={() =>
                                dispatch({
                                    type: "RETWEET_TWEET",
                                    payload: {
                                        retweets: tweet.retweets,
                                        session,
                                        id,
                                    },
                                })
                            }
                        >
                            <RefreshIcon className="btn-icon h-7" />
                        </button>
                        <button
                            className={`btn hover:text-red-500 hover:bg-red-100 ${
                                state.liked ? "text-red-500" : "text-gray-500"
                            }`}
                            onClick={() =>
                                dispatch({
                                    type: "LIKE_TWEET",
                                    payload: {
                                        likes: tweet.likes,
                                        session,
                                        id,
                                    },
                                })
                            }
                        >
                            <HeartIcon className="btn-icon h-7" />
                        </button>
                        <button className="btn text-gray-500 hover:text-blue-500">
                            <UploadIcon className="btn-icon h-7" />
                        </button>
                    </div>
                    <motion.div
                        variants={buttonVariant}
                        initial="initial"
                        animate={state.toggleEdit ? "animate" : "initial"}
                        className="overflow-hidden h-0"
                    >
                        <div className="border-t mt-4 pt-3 pointer-events-auto flex space-x-5 items-center">
                            <textarea
                                className="block w-full border-none outline-none text-xl"
                                placeholder="Edit this Tweet"
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                                data-gramm_editor="false"
                            ></textarea>
                            <button
                                className="primary-btn w-auto px-4 py-2"
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

                                    getTweet();

                                    dispatch({
                                        type: "TOGGLE_EDIT",
                                    });
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </motion.div>
                    <div className="flex items-center mt-4 space-x-4">
                        <div className="min-w-max">
                            <Image
                                src={session?.user?.image as string}
                                height={50}
                                width={50}
                                objectFit="contain"
                                className="user-img"
                            />
                        </div>
                        <form className="flex-grow">
                            <textarea
                                className="w-full border-none outline-none text-xl"
                                placeholder="Tweet your reply"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                ref={replyInput}
                                data-gramm_editor="false"
                            ></textarea>
                        </form>
                        <button
                            className="primary-btn w-auto px-4 py-2"
                            disabled={!reply}
                            onClick={() => {
                                addReply();

                                setReply("");
                            }}
                        >
                            Reply
                        </button>
                    </div>
                    <motion.div
                        variants={buttonVariant}
                        initial="initial"
                        animate={state.toggleOptions ? "animate" : "initial"}
                        className="absolute z-10 top-12 right-4 bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <button
                            className="tweet-options-btn"
                            onClick={() => {
                                dispatch({
                                    type: "DELETE_TWEET",
                                    payload: { id },
                                });

                                router.replace("/");
                            }}
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
                </main>
                {replies
                    ? replies.length
                        ? replies.map(
                              ({
                                  author,
                                  content,
                                  date,
                                  id,
                                  likes,
                                  replies,
                                  retweets,
                                  type,
                                  edited,
                              }) => (
                                  <Tweet
                                      author={author}
                                      content={content}
                                      date={date}
                                      id={id}
                                      likes={likes}
                                      replies={replies}
                                      retweets={retweets}
                                      type={type}
                                      key={id}
                                      edited={edited}
                                  />
                              )
                          )
                        : ""
                    : ""}
            </div>
        </>
    );
};

TweetDetails.getInitialProps = ({ query }: { query: any }) => ({
    initialId: "",
    key: query.id,
});

export default TweetDetails;
