export const oauth2 = {
    authorization: {
        google: `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth2/google`,
        github: `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth2/github`,
        steam: `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth2/steam`,
    },
};
