import {Router} from "express";

import {validation} from "@lib/validation";
import {prisma} from "@lib/prisma";
import {shared} from "@lib/shared";

import * as dtos from "./dtos";

export const router = Router();

export const route = "/users";

router.get("/@/:username", validation.check(dtos.GetUser), async (req, res) => {
    const {username} = req.params as dtos.GetUserParams;

    const user = await prisma.user.findUnique({where: {username}});

    res.json({
        user: shared.user(user),
    });
});
