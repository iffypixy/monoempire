const origin = process.env.CLIENT_ORIGIN;

const registration = {
    google: `${origin}${process.env.CLIENT_GOOGLE_REGISTRATION}`,
};

export const client = {origin, registration};
