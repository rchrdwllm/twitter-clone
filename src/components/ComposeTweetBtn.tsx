import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";

const ComposeTweetBtn = () => {
    return (
        <Link href="/compose/tweet">
            <a className="lg:hidden fixed bottom-20 right-6 z-10 primary-btn w-auto flex justify-center items-center shadow-md p-4">
                <PencilIcon className="btn-icon text-white" />
            </a>
        </Link>
    );
};

export default ComposeTweetBtn;
