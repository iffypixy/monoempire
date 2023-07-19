import {RequestHandler} from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    const is = !!req.session.userId;

    if (is) return next();

    return res.status(403).json({message: "Not authenticated"});
};
