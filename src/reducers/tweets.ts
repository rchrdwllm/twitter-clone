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
    edited: boolean;
}

interface TweetStates {
    isAuthor: boolean;
    liked: boolean;
    retweeted: boolean;
    toggleOptions: boolean;
    toggleEdit: boolean;
}

export const tweetInitialStates = {
    isAuthor: false,
    liked: false,
    retweeted: false,
    toggleOptions: false,
    toggleEdit: false,
};

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
                .get()
                .then((doc) => {
                    (doc.data() as Tweet).replies.forEach((reply) => {
                        firebase
                            .firestore()
                            .collection("tweets")
                            .doc(reply)
                            .delete();
                    });

                    firebase
                        .firestore()
                        .collection("tweets")
                        .doc(action.payload.id)
                        .delete();
                });
        case "TOGGLE_OPTIONS":
            return {
                ...state,
                toggleOptions: !state.toggleOptions,
            };
        case "EDIT_TWEET":
            firebase
                .firestore()
                .collection("tweets")
                .doc(action.payload.id)
                .update({
                    content: action.payload.editedContent,
                    edited: true,
                });

            return state;
        case "TOGGLE_EDIT":
            return {
                ...state,
                toggleEdit: !state.toggleEdit,
            };
        default:
            return state;
    }
};
