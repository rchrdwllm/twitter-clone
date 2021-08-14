import {
    SearchIcon,
    CogIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/client";

const Trends = () => {
    const [session] = useSession();

    if (!session) return null;

    return (
        <aside className="hidden lg:block whitespace-nowrap sticky top-0 h-screen border-l pr-10 pl-8 pt-4 pb-8">
            <form className="flex items-center bg-gray-50 rounded-full px-4 py-3 space-x-4">
                <SearchIcon className="h-5 text-gray-500" />
                <input
                    type="text"
                    className="block w-full h-full border-none outline-none bg-transparent"
                    placeholder="Search Twitter"
                />
            </form>
            <div className="mt-4 rounded-xl overflow-hidden bg-gray-50">
                <header className="p-3 flex justify-between items-center">
                    <h1 className="font-emphasis whitespace-nowrap">
                        Trends for you
                    </h1>
                    <button className="btn text-black hover:text-blue-500">
                        <CogIcon className="btn-icon" />
                    </button>
                </header>
                <main className="text-gray-400 border-b">
                    <article className="p-3 border-t flex space-x-44 items-start justify-between transition-colors cursor-pointer hover:bg-gray-100">
                        <div>
                            <p className="text-sm">Trending in Philippines</p>
                            <h3 className="font-emphasis text-black">
                                Friday the 13th
                            </h3>
                            <p className="text-sm">62.5K Tweets</p>
                        </div>
                        <button className="btn text-gray-500 hover:text-blue-500 hover:bg-blue-200">
                            <DotsHorizontalIcon className="btn-icon" />
                        </button>
                    </article>
                    <article className="p-3 border-t flex space-x-20 items-start justify-between transition-colors cursor-pointer hover:bg-gray-100">
                        <div>
                            <p className="text-sm">Trending in Philippines</p>
                            <h3 className="font-emphasis text-black">
                                Friday the 13th
                            </h3>
                            <p className="text-sm">62.5K Tweets</p>
                        </div>
                        <button className="btn text-gray-500 hover:text-blue-500 hover:bg-blue-200">
                            <DotsHorizontalIcon className="btn-icon" />
                        </button>
                    </article>
                    <article className="p-3 border-t flex space-x-20 items-start justify-between transition-colors cursor-pointer hover:bg-gray-100">
                        <div>
                            <p className="text-sm">Trending in Philippines</p>
                            <h3 className="font-emphasis text-black">
                                Friday the 13th
                            </h3>
                            <p className="text-sm">62.5K Tweets</p>
                        </div>
                        <button className="btn text-gray-500 hover:text-blue-500 hover:bg-blue-200">
                            <DotsHorizontalIcon className="btn-icon" />
                        </button>
                    </article>
                    <article className="p-3 border-t flex space-x-20 items-start justify-between transition-colors cursor-pointer hover:bg-gray-100">
                        <div>
                            <p className="text-sm">Trending in Philippines</p>
                            <h3 className="font-emphasis text-black">
                                Friday the 13th
                            </h3>
                            <p className="text-sm">62.5K Tweets</p>
                        </div>
                        <button className="btn text-gray-500 hover:text-blue-500 hover:bg-blue-200">
                            <DotsHorizontalIcon className="btn-icon" />
                        </button>
                    </article>
                </main>
                <button className="block w-full text-left text-blue-500 transition-colors p-3 hover:bg-gray-100">
                    See more
                </button>
            </div>
        </aside>
    );
};

export default Trends;
