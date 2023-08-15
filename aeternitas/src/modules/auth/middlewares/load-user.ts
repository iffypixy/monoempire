import {RequestHandler} from "express";

import {prisma} from "@lib/prisma";

export const loadUser: RequestHandler = async (req, res, next) => {
    req.session.user = await prisma.user.findUnique({
        where: {id: req.session.userId},
    });

    next();
};
