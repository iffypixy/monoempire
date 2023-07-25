export const shuffle = <T>(array: Array<T>): Array<T> => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];

        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled;
};
