import {Controller, Get, Query, Res, Session} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SessionWithData} from "express-session";
import {Response} from "express";

import {OAuth2Service} from "@lib/oauth2";
import {PrismaService} from "@lib/prisma";

import * as dtos from "../dtos";

@Controller("auth/oauth2/google")
export class GoogleAuthController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly oauth2: OAuth2Service,
    ) {}

    @Get("/")
    redirectToAuthorization(@Res() res: Response) {
        res.redirect(this.oauth2.google.authorizationURL);
    }

    @Get("redirect")
    async handleRedirect(
        @Session() session: SessionWithData,
        @Query() dto: dtos.OAuth2RedirectQuery,
        @Res() res: Response,
    ) {
        const credentials = await this.oauth2.google.loadCredentials(dto.code);

        const provider = await this.prisma.authProvider.findFirst({
            where: {uid: credentials.id, name: "google"},
            include: {user: true},
        });

        if (provider) {
            session.user = provider.user;
            session.userId = provider.userId;

            return res.redirect(this.config.get("client.origin")!);
        }

        session.registration = {
            interim: {
                id: credentials.id,
                email: credentials.email,
                provider: "google",
            },
        };

        session.save(() => {
            res.redirect(this.config.get("client.registration")!);
        });
    }
}
