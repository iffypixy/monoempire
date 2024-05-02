import {Controller, Get, Query, Req, Res, Session} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SessionWithData} from "express-session";
import {Request, Response} from "express";
import axios from "axios";

import {PrismaService} from "@lib/prisma";

import * as dtos from "../dtos";

/** @note Steam doesn't support OAuth2. It supports OpenID instead, so I didn't use the OAuth2Service. */

@Controller("auth/oauth2/steam")
export class SteamAuthController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
    ) {}

    @Get("/")
    redirectToAuthorization(@Req() req: Request, @Res() res: Response) {
        const redirectUri = this.config.get<string>(
            "oauth2.steam.redirectUri",
        )!;

        const params = new URLSearchParams({
            "openid.ns": "http://specs.openid.net/auth/2.0",
            "openid.mode": "checkid_setup",
            "openid.return_to": redirectUri,
            "openid.realm": redirectUri,
            "openid.identity":
                "http://specs.openid.net/auth/2.0/identifier_select",
            "openid.claimed_id":
                "http://specs.openid.net/auth/2.0/identifier_select",
        });

        const authorizationUri = this.config.get<string>(
            "oauth2.steam.authorizationUri",
        )!;

        res.redirect(`${authorizationUri}?${params}`);
    }

    @Get("redirect")
    async handleRedirect(
        @Session() session: SessionWithData,
        @Query() dto: dtos.SteamOpenIdRedirectQuery,
        @Res() res: Response,
    ) {
        const params = dto;

        params["openid.mode"] = "check_authentication";

        const authorizationUri = this.config.get<string>(
            "oauth2.steam.authorizationUri",
        )!;

        const {data: validity} = await axios(authorizationUri, {
            method: "POST",
            params,
            headers: {
                "Content-Type": "text/plain",
            },
        });

        const isValid = !!validity.match(/is_valid\s*:\s*true/i);

        if (!isValid) return res.redirect(this.config.get("client.origin")!);

        const steamId = dto["openid.claimed_id"].match(
            /^https:\/\/steamcommunity.com\/openid\/id\/([0-9]{17,25})/,
        )![1];

        const credentialsUri = this.config.get<string>(
            "oauth2.steam.credentialsUri",
        )!;

        const {
            data: {
                response: {players},
            },
        } = await axios(credentialsUri, {
            method: "GET",
            params: {
                key: this.config.get<string>("oauth2.steam.client.id")!,
                steamids: steamId,
            },
        });

        const credentials = players[0] as {
            steamid: string;
            communityvisibilitystate: number;
            profilestate: number;
            personaname: string;
            profileurl: string;
            avatar: string;
            avatarmedium: string;
            avatarfull: string;
            avatarhash: string;
            lastlogoff: number;
            personastate: number;
            primaryclanid: string;
            timecreated: number;
            personastateflags: number;
            loccountrycode: string;
        };

        const provider = await this.prisma.authProvider.findFirst({
            where: {uid: credentials.steamid, name: "steam"},
            include: {user: true},
        });

        if (provider) {
            session.user = provider.user;
            session.userId = provider.userId;

            return res.redirect(this.config.get("client.origin")!);
        }

        session.registration = {
            interim: {
                id: credentials.steamid,
                provider: "steam",
            },
        };

        session.save(() => {
            res.redirect(this.config.get("client.registration")!);
        });
    }
}
