import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase";
import Tweet from "./Tweet";
import { Tweet as TweetType } from "../reducers/tweets";

const Tweets = () => {
    const [tweetsCollection, tweetsLoading] = useCollection(
        firebase.firestore().collection("tweets").orderBy("date", "desc"),
        {}
    );
    const [tweets, setTweets] = useState<TweetType[] | null>(null);

    useEffect(() => {
        if (!tweetsLoading && tweetsCollection) {
            const filteredTweets = tweetsCollection.docs.map(
                (doc) => doc.data() as TweetType
            );
            const tweets = filteredTweets.filter(
                ({ type }) => type === "tweet"
            );

            setTweets(tweets);
        }
    }, [tweetsCollection]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!tweets) {
        return (
            <div className="p-10 flex justify-center items-center">
                <h1 className="text-gray-400 text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    if (tweets) {
        if (!tweets.length)
            return (
                <div className="p-10 flex justify-center items-center">
                    <h1 className="text-gray-400 text-2xl font-bold">
                        No tweets!
                    </h1>
                </div>
            );
    }

    return (
        <main className="pb-14 lg:p-0">
            {tweets.map(
                ({
                    author,
                    content,
                    date,
                    id,
                    likes,
                    replies,
                    retweets,
                    type,
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
                    />
                )
            )}
        </main>
    );
};

export default Tweets;
