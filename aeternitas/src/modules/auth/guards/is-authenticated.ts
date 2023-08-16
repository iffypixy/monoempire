import {RequestHandler} from "express";

import {ws} from "@lib/ws";

export const isAuthenticated = {
    http: ((req, res, next) => {
        const is = !!req.session.userId;

        if (is) return next();

        return res.status(401).json("Not authenticated");
    }) as RequestHandler,
    ws: ws.guard((socket) => !!socket.request.session.userId),
};
