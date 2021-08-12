export const useAnimations = () => {
    const transition = {
        ease: [0.25, 1, 0.5, 1],
        duration: 0.75,
    };

    const menuVariant = {
        initial: {
            x: "-100%",
            transition,
        },
        animate: {
            x: 0,
            transition,
        },
    };

    const buttonVariant = {
        initial: {
            height: 0,
            transition,
        },
        animate: {
            height: "auto",
            transition,
        },
    };

    return { transition, menuVariant, buttonVariant };
};
