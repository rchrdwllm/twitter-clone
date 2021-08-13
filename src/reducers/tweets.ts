import { AnyAction } from "redux";
import firebase from "../../firebase";

export interface Tweet {
    type: "tweet" | "reply";
    author: {
        email: string | null | undefined;
        image: string | null | undefined;
        name: string | null | undefined;
    };
    content: string | number;
    date: {
        dateId: number;
        dateTweeted: string;
        day: number;
        month: string;
        year: number;
    };
    id: string;
    likes: string[];
    replies: string[];
    retweets: string[];
}

interface TweetStates {
    isAuthor: boolean;
    liked: boolean;
    retweeted: boolean;
    toggleDelete: boolean;
}

export const tweets = (state: TweetStates, action: AnyAction) => {
    switch (action.type) {
        case "INITIALIZE":
            if (!action.payload.session) {
                return state;
            }

            return {
                ...state,
                isAuthor: !action.payload.session
                    ? false
                    : action.payload.session.user.email === action.payload.email
                    ? true
                    : false,
                liked: !action.payload.session
                    ? false
                    : action.payload.likes.includes(
                          action.payload.session.user.email
                      )
                    ? true
                    : false,
                retweeted: !action.payload.session
                    ? false
                    : action.payload.retweets.includes(
                          action.payload.session.user.email
                      )
                    ? true
                    : false,
            };
        case "LIKE_TWEET":
            state.liked
                ? action.payload.likes.splice(
                      action.payload.likes.indexOf(
                          action.payload.session.user.email
                      ),
                      1
                  )
                : !action.payload.likes.includes(
                      action.payload.session.user.email
                  ) &&
                  action.payload.likes.push(action.payload.session.user.email);

            firebase
                .firestore()
                .collection("tweets")
                .doc(action.payload.id)
                .update({
                    likes: action.payload.likes,
                });

            return { ...state, liked: !state.liked };
        case "RETWEET_TWEET":
            state.retweeted
                ? action.payload.retweets.splice(
                      action.payload.retweets.indexOf(
                          action.payload.session.user.email
                      ),
                      1
                  )
                : !action.payload.retweets.includes(
                      action.payload.session.user.email
                  ) &&
                  action.payload.retweets.push(
                      action.payload.session.user.email
                  );

            firebase
                .firestore()
                .collection("tweets")
                .doc(action.payload.id)
                .update({
                    retweets: action.payload.retweets,
                });

            return { ...state, retweeted: !state.retweeted };
        case "DELETE_TWEET":
            const handleTweets = (tweet: Tweet) => {
                const filteredReplies = tweet.replies.filter(
                    (id) => id !== action.payload.id
                );

                firebase.firestore().collection("tweets").doc(tweet.id).update({
                    replies: filteredReplies,
                });
            };

            firebase
                .firestore()
                .collection("tweets")
                .get()
                .then((snap) => {
                    snap.forEach((doc) => handleTweets(doc.data() as Tweet));
                });

            firebase
                .firestore()
                .collection("tweets")
                .doc(action.payload.id)
                .delete();
        case "TOGGLE_DELETE":
            return {
                ...state,
                toggleDelete: !state.toggleDelete,
            };
        default:
            return state;
    }
};
