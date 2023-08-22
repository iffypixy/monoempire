import {Module} from "@nestjs/common";

import {UsersController} from "./controller";

@Module({
    controllers: [UsersController],
})
export class UsersModule {}
