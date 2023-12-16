import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Session,
    UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import bcrypt from "bcrypt";

import {users} from "@modules/users";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import {IsHTTPAuthenticated} from "../guards";
import * as dtos from "../dtos";

@Controller("auth")
export class LocalAuthController {
    constructor(private readonly prisma: PrismaService) {}

    @UseGuards(IsHTTPAuthenticated)
    @Get("/credentials")
    getCredentials(@Session() session: SessionWithData) {
        return {
            credentials: sanitized.credentials(session.user!),
        };
    }

    @Post("/login")
    async login(
        @Body() dto: dtos.LoginBody,
        @Session() session: SessionWithData,
    ) {
        let user = await this.prisma.user.findUnique({
            where: {
                email: dto.emailOrUsername,
            },
        });

        if (!user)
            user = await this.prisma.user.findUnique({
                where: {
                    username: dto.emailOrUsername,
                },
            });

        const exception = new BadRequestException("Invalid credentials");

        if (!user) throw exception;

        const match = await bcrypt.compare(dto.password, user.password!);

        if (!match) throw exception;

        session.userId = user.id;
        session.user = user;

        return {
            credentials: sanitized.credentials(user),
        };
    }

    @Post("/register")
    async register(
        @Body() dto: dtos.RegisterBody,
        @Session() session: SessionWithData,
    ) {
        const isUsernameTaken = !!(await this.prisma.user.findFirst({
            where: {username: dto.username},
        }));

        if (isUsernameTaken)
            throw new BadRequestException("This username is already taken");

        const isEmailTaken = !!(await this.prisma.user.findFirst({
            where: {email: dto.email},
        }));

        if (isEmailTaken)
            throw new BadRequestException("This email is already taken");

        const hash = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: hash,
                avatar: users.lib.avatars.random(),
            },
        });

        session.userId = user.id;
        session.user = user;

        return {
            credentials: sanitized.credentials(user),
        };
    }

    @HttpCode(204)
    @Post("logout")
    logout(@Session() session: SessionWithData) {
        session.user = null;
        session.userId = null;
    }

    @Post("verify/username")
    async verifyUsername(
        @Body() dto: dtos.VerifyUsernameDto,
    ): Promise<{ok: boolean}> {
        const user = await this.prisma.user.findFirst({
            where: {username: dto.username},
        });

        if (user)
            return {
                ok: false,
            };

        return {
            ok: true,
        };
    }

    @Post("verify/email")
    async verifyEmail(
        @Body() dto: dtos.VerifyEmailDto,
    ): Promise<{ok: boolean}> {
        const user = await this.prisma.user.findFirst({
            where: {email: dto.email},
        });

        if (user)
            return {
                ok: false,
            };

        return {
            ok: true,
        };
    }
}
