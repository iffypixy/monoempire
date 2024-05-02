import {NestFactory} from "@nestjs/core";

import {session} from "@lib/session";
import {redis} from "@lib/redis";
import {WsAdapter} from "@lib/ws";

import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: process.env.CLIENT_ORIGIN,
        },
    });

    redis.setUp();

    app.use(session());
    app.setGlobalPrefix("api");

    app.useWebSocketAdapter(new WsAdapter(app, true));

    app.listen(8000);
}

bootstrap();
