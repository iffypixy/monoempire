import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

import {PrismaService} from "@lib/prisma";

@Injectable()
export class LoadUser implements NestMiddleware {
    constructor(private readonly prisma: PrismaService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.session.userId) {
            req.session.user = await this.prisma.user.findUnique({
                where: {id: req.session.userId},
            });
        }

        next();
    }
}
