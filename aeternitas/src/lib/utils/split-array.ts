export const splitArray = (array: any[], chunks: number) =>
    Array(Math.ceil(array.length / chunks))
        .fill(null)
        .map((_, index) => index * chunks)
        .map((start) => array.slice(start, start + chunks));
