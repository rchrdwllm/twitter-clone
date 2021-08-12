import { useEffect, useState } from "react";

export const useWidth = () => {
    const [width, setWidth] = useState<number>(() => {
        if (typeof window !== "undefined") return window.innerWidth as any;
    });

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
    }, []);

    return width;
};
