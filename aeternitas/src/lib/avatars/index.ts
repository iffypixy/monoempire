const collection = [
    "https://common-stuff-bucket.s3.eu-central-1.amazonaws.com/1-min.png",
    "https://common-stuff-bucket.s3.eu-central-1.amazonaws.com/2-min.png",
    "https://common-stuff-bucket.s3.eu-central-1.amazonaws.com/3-min.png",
    "https://common-stuff-bucket.s3.eu-central-1.amazonaws.com/4-min.png",
    "https://common-stuff-bucket.s3.eu-central-1.amazonaws.com/5-min.png",
];

export const random = () => {
    const random = Math.floor(Math.random() * collection.length);

    return collection[random];
};

export const avatars = {random};
