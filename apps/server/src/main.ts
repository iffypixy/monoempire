import {NestFactory} from "@nestjs/core";

import {session} from "@lib/session";
import {redis} from "@lib/redis";

import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: "http://localhost:5173",
        },
    });

    redis.setup();

    app.use(session());
    app.setGlobalPrefix("api");

    app.listen(8000);
}

bootstrap();
