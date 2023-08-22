import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Session,
    UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";

import {users} from "@modules/users";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";
import {Nullable} from "@lib/types";

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
    async login(@Body() dto: dtos.LoginBody) {
        let user: Nullable<User> = null;

        if (dto.username)
            user = await this.prisma.user.findFirst({
                where: {
                    username: dto.username,
                },
            });
        else if (dto.email)
            user = await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                },
            });

        const exception = new BadRequestException("Invalid credentials");

        if (!user) throw exception;

        const match = await bcrypt.compare(dto.password, user.password!);

        if (!match) throw exception;

        return {
            credentials: sanitized.credentials(user),
        };
    }

    @Post("/register")
    async register(@Body() dto: dtos.RegisterBody) {
        const isUsernameTaken = await this.prisma.user.findFirst({
            where: {username: dto.username},
        });

        if (isUsernameTaken)
            throw new BadRequestException("This username is already taken");

        const isEmailTaken = await this.prisma.user.findFirst({
            where: {email: dto.email},
        });

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

        return {
            credentials: sanitized.credentials(user),
        };
    }
}
