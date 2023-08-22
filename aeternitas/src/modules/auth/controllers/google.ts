import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Query,
    Res,
    Session,
} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SessionWithData} from "express-session";
import {Response} from "express";

import {users} from "@modules/users";
import {OAuth2Service} from "@lib/oauth2";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

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
        @Query() dto: dtos.GoogleRedirectQuery,
        @Res() res: Response,
    ) {
        const credentials = await this.oauth2.google.loadCredentials(dto.code);

        const user = await this.prisma.user.findUnique({
            where: {email: credentials.email},
        });

        if (user)
            return {
                url: this.config.get("client.origin"),
            };

        session.registration = {
            interim: {
                google: {
                    id: credentials.id,
                    email: credentials.email,
                },
            },
        };

        res.redirect(this.config.get("client.registration.google")!);
    }

    @Post("register")
    @HttpCode(201)
    async register(
        @Body() dto: dtos.GoogleRegisterBody,
        @Session() session: SessionWithData,
    ) {
        const email = session.registration!.interim.google.email;

        if (!email) throw new BadRequestException("No google email provided");

        const user = await this.prisma.user.create({
            data: {
                email,
                username: dto.username,
                avatar: users.lib.avatars.random(),
            },
        });

        return {
            credentials: sanitized.credentials(user),
        };
    }
}
