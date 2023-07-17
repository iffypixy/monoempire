const ORIGIN = process.env.CLIENT_ORIGIN;

const registration = {
    GOOGLE: `${ORIGIN}${process.env.CLIENT_GOOGLE_REGISTRATION}`,
};

export const client = {ORIGIN, registration};
