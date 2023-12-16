import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Session,
} from "@nestjs/common";
import {SessionWithData} from "express-session";

import {sanitized} from "@lib/sanitized";
import {PrismaService} from "@lib/prisma";
import {users} from "@modules/users";

import * as dtos from "../dtos";

@Controller("auth/oauth2")
export class OAuth2Controller {
    constructor(private readonly prisma: PrismaService) {}

    @Get("/interim")
    getInterimCredentials(@Session() session: SessionWithData) {
        const data = session.registration?.interim;

        if (!data)
            throw new BadRequestException("No interim credentials found");

        return {
            id: data.id,
            email: data.email,
            provider: data.provider,
        };
    }

    @HttpCode(201)
    @Post("/register")
    async register(
        @Body() dto: dtos.OAuth2RegisterDto,
        @Session() session: SessionWithData,
    ) {
        const id = session.registration?.interim.id;

        if (!id) throw new BadRequestException("No google id provided");

        const email = session.registration!.interim.email || dto.email;

        if (!email) throw new BadRequestException("No email provided");

        const isEmailTaken = !!(await this.prisma.user.findFirst({
            where: {email},
        }));

        if (isEmailTaken)
            throw new BadRequestException("Provided email is already taken");

        const user = await this.prisma.user.create({
            data: {
                email,
                username: dto.username,
                avatar: users.lib.avatars.random(),
            },
        });

        await this.prisma.authProvider.create({
            data: {
                name: session.registration!.interim.provider,
                uid: id,
                userId: user.id,
            },
        });

        session.user = user;
        session.userId = user.id;

        return {
            credentials: sanitized.credentials(user),
        };
    }
}
