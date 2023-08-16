import {Router} from "express";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";

import {users} from "@modules/users";
import {oauth2} from "@lib/oauth2";
import {prisma} from "@lib/prisma";
import {config} from "@lib/config";
import {shared} from "@lib/shared";
import {validation} from "@lib/validation";

import {isAuthenticated} from "./guards";
import {loadUser} from "./middlewares";
import * as dtos from "./dtos";

export const router = Router();

export const route = "/api/auth";

router.get("/credentials", isAuthenticated.http, loadUser, async (req, res) => {
    res.json({
        credentials: shared.credentials(req.session.user),
    });
});

router.post("/login", validation.check.http(dtos.Login), async (req, res) => {
    const {email, username, password} = req.body as dtos.LoginBody;

    let user: User;

    if (username) user = await prisma.user.findFirst({where: {username}});
    else if (email) user = await prisma.user.findFirst({where: {email}});

    if (!user) return res.status(400).json("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json("Invalid credentials");

    res.status(200).json({
        credentials: shared.credentials(user),
    });
});

router.post(
    "/register",
    validation.check.http(dtos.Register),
    async (req, res) => {
        const {username, email, password} = req.body as dtos.RegisterBody;

        const isUsernameTaken = await prisma.user.findFirst({
            where: {username},
        });

        if (isUsernameTaken)
            return res.status(400).json("The username is already taken");

        const isEmailTaken = await prisma.user.findFirst({where: {email}});

        if (isEmailTaken)
            return res.status(400).json("The email is already taken");

        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hash,
                avatar: users.lib.avatars.random(),
            },
        });

        res.status(201).json({
            credentials: shared.credentials(user),
        });
    },
);

router.get("/oauth2/google", (req, res) => {
    res.redirect(oauth2.google.authorizationURL);
});

router.get(
    "/oauth2/google/redirect",
    validation.check.http(dtos.GoogleRedirect),
    async (req, res) => {
        const {code} = req.query as dtos.GoogleRedirectQuery;

        const credentials = await oauth2.google.loadCredentials(code);

        const user = await prisma.user.findUnique({
            where: {email: credentials.email},
        });

        if (!user) {
            req.session.registration.interim.google = {
                id: credentials.id,
                email: credentials.email,
            };

            return res.redirect(`${config.client.registration}`);
        }

        res.redirect(`${config.client.registration.GOOGLE}`);
    },
);

router.post(
    "/oauth2/google/register",
    validation.check.http(dtos.GoogleRegister),
    async (req, res) => {
        const {username} = req.body as dtos.GoogleRegisterBody;

        const email = req.session.registration.interim.google.email;

        if (!email) return res.status(400).json("No google email provided");

        const user = await prisma.user.create({
            data: {email, username, avatar: users.lib.avatars.random()},
        });

        res.status(201).json({
            credentials: shared.credentials(user),
        });
    },
);
