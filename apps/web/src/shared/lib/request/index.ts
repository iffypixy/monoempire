import axios from "axios";

export const request = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export interface Dto<Req, Res> {
    req: Req;
    res: Res;
}
