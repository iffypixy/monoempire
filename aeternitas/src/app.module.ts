import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";

import {config} from "@config/index";
import {AuthModule} from "@modules/auth";
import {MatchesModule} from "@modules/matches";
import {UsersModule} from "@modules/users";
import {RedisModule} from "@lib/redis";
import {PrismaModule} from "@lib/prisma";
import {OAuth2Module} from "@lib/oauth2";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: config,
            envFilePath: ".env",
            isGlobal: true,
        }),
        PrismaModule.forRoot(),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (service: ConfigService) => ({
                host: service.get("redis.host"),
                port: service.get("redis.port"),
            }),
        }),
        OAuth2Module.forRoot(),
        AuthModule,
        UsersModule,
        MatchesModule,
    ],
})
export class AppModule {}
