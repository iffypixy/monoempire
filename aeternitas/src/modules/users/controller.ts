import {Controller, Get, NotFoundException, Param} from "@nestjs/common";

import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";

import * as dtos from "./dtos";

@Controller("users")
export class UsersController {
    constructor(private readonly prisma: PrismaService) {}

    @Get("@/:username")
    async getUserByUsername(@Param() dto: dtos.GetUserParams) {
        const user = await this.prisma.user.findUnique({
            where: {username: dto.username},
        });

        if (!user) throw new NotFoundException("No user found");

        return {
            user: sanitized.user(user),
        };
    }
}
