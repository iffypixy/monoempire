import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";

import {OAuth2Module} from "@lib/oauth2";

import {
    LocalAuthController,
    GoogleAuthController,
    GithubAuthController,
    OAuth2Controller,
} from "./controllers";
import {LoadUser} from "./middlewares";

@Module({
    imports: [OAuth2Module],
    controllers: [
        LocalAuthController,
        GoogleAuthController,
        GithubAuthController,
        OAuth2Controller,
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoadUser).forRoutes({
            path: "auth/credentials",
            method: RequestMethod.GET,
        });
    }
}
