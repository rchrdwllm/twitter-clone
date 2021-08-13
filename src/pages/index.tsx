import Image from "next/image";
import Head from "next/head";
import { getSession, signIn } from "next-auth/client";
import Tweets from "../components/Tweets";
import { Session } from "next-auth";
import TweetForm from "../components/TweetForm";
import { FunctionComponent } from "react";
import ComposeTweetBtn from "../components/ComposeTweetBtn";
import Loader from "../components/Loader";
import { RootStateOrAny, useSelector } from "react-redux";

interface HomeProps {
    session: Session;
}

const Home: FunctionComponent<HomeProps> = ({ session }) => {
    const mounted = useSelector((state: RootStateOrAny) => state.mounted);

    console.log(mounted);

    if (!session)
        return (
            <>
                <Head>
                    <title>
                        Twitter. It&apos;s what&apos;s happening / Twitter
                    </title>
                </Head>
                <div className="lg:flex flex-row-reverse min-h-screen w-full">
                    <div className="p-8 sm:p-12 md:px-24 lg:p-12">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-10 fill-current text-blue-500 r-k200y r-13gxpu9 r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr"
                        >
                            <g>
                                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                            </g>
                        </svg>
                        <h1 className="font-heading text-4xl leading-tight my-12 md:text-6xl md:whitespace-nowrap">
                            Happening now
                        </h1>
                        <h3 className="font-heading text-xl lg:text-4xl">
                            Join Twitter today.
                        </h3>
                        <div className="my-4 space-y-4">
                            <button
                                className="log-in-btn"
                                onClick={() => signIn("google")}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="log-in-btn-icon r-18jsvk2 r-4qtqp9 r-yyyyoo r-18yzcnr r-1sp7lne r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-yc9v9c"
                                >
                                    <g>
                                        <path
                                            d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
                                            fill="#EA4335"
                                        ></path>
                                        <path
                                            d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
                                            fill="#FBBC05"
                                        ></path>
                                        <path
                                            d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
                                            fill="#34A853"
                                        ></path>
                                        <path
                                            d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
                                            fill="#4285F4"
                                        ></path>
                                    </g>
                                </svg>
                                <span>Log in with Google</span>
                            </button>
                            <button
                                className="log-in-btn"
                                onClick={() => signIn("github")}
                            >
                                <svg
                                    className="log-in-btn-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span>Log in with Github</span>
                            </button>
                            <button
                                className="log-in-btn"
                                onClick={() => signIn("discord")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    height="24px"
                                    className="log-in-btn-icon"
                                    fill="#5865F2"
                                >
                                    <path d="M19.952,5.672c-1.904-1.531-4.916-1.79-5.044-1.801c-0.201-0.017-0.392,0.097-0.474,0.281 c-0.006,0.012-0.072,0.163-0.145,0.398c1.259,0.212,2.806,0.64,4.206,1.509c0.224,0.139,0.293,0.434,0.154,0.659 c-0.09,0.146-0.247,0.226-0.407,0.226c-0.086,0-0.173-0.023-0.252-0.072C15.584,5.38,12.578,5.305,12,5.305S8.415,5.38,6.011,6.872 c-0.225,0.14-0.519,0.07-0.659-0.154c-0.14-0.225-0.07-0.519,0.154-0.659c1.4-0.868,2.946-1.297,4.206-1.509 c-0.074-0.236-0.14-0.386-0.145-0.398C9.484,3.968,9.294,3.852,9.092,3.872c-0.127,0.01-3.139,0.269-5.069,1.822 C3.015,6.625,1,12.073,1,16.783c0,0.083,0.022,0.165,0.063,0.237c1.391,2.443,5.185,3.083,6.05,3.111c0.005,0,0.01,0,0.015,0 c0.153,0,0.297-0.073,0.387-0.197l0.875-1.202c-2.359-0.61-3.564-1.645-3.634-1.706c-0.198-0.175-0.217-0.477-0.042-0.675 c0.175-0.198,0.476-0.217,0.674-0.043c0.029,0.026,2.248,1.909,6.612,1.909c4.372,0,6.591-1.891,6.613-1.91 c0.198-0.172,0.5-0.154,0.674,0.045c0.174,0.198,0.155,0.499-0.042,0.673c-0.07,0.062-1.275,1.096-3.634,1.706l0.875,1.202 c0.09,0.124,0.234,0.197,0.387,0.197c0.005,0,0.01,0,0.015,0c0.865-0.027,4.659-0.667,6.05-3.111 C22.978,16.947,23,16.866,23,16.783C23,12.073,20.985,6.625,19.952,5.672z M8.891,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913s1.674,0.857,1.674,1.913S9.816,14.87,8.891,14.87z M15.109,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913c0.924,0,1.674,0.857,1.674,1.913S16.033,14.87,15.109,14.87z" />
                                </svg>
                                <span>Log in with Discord</span>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            By signing up, you agree to the{" "}
                            <span className="text-blue-500">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="text-blue-500">
                                Privacy Policy
                            </span>
                            ,{" "}
                            <span className="text-blue-500">
                                including Cookie Use.
                            </span>
                        </p>
                    </div>
                    <div className="relative flex justify-center items-center h-72 w-full lg:h-auto">
                        <div className="absolute top-0 left-0 w-full h-full">
                            <Image
                                src="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                alt="twitter banner"
                                blurDataURL="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
                            />
                        </div>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="relative z-10 h-44 lg:h-80 text-white fill-current r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
                        >
                            <g>
                                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </>
        );

    return (
        <>
            <Head>
                <title>Home / Twitter</title>
            </Head>
            <div className="relative flex-grow">
                {!mounted && (
                    <div className="w-full h-screen flex justify-center items-center">
                        <Loader />
                    </div>
                )}
                <header className="hidden lg:flex sticky bg-white top-0 left-0 z-20 justify-between items-center p-4 py-3 border-b space-x-6">
                    <h1 className="font-emphasis text-xl flex-grow">Home</h1>
                </header>
                <TweetForm />
                <Tweets />
                <ComposeTweetBtn />
            </div>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    return {
        props: { session },
    };
};

export default Home;
