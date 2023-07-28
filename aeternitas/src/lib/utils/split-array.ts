export const splitArray = <T>(array: Array<T>, chunks: number): T[][] =>
    Array(Math.ceil(array.length / chunks))
        .fill(null)
        .map((_, index) => index * chunks)
        .map((start) => array.slice(start, start + chunks));
