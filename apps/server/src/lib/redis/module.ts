import {
    DynamicModule,
    FactoryProvider,
    Module,
    ModuleMetadata,
    Provider,
} from "@nestjs/common";
import {RedisOptions, Redis} from "ioredis";

import {RedisService} from "./service";
import {REDIS_TOKEN} from "./constants";

interface RedisModuleOptions {
    imports: ModuleMetadata["imports"];
    inject: FactoryProvider["inject"];
    useFactory: (...args: any[]) => RedisOptions;
}

@Module({})
export class RedisModule {
    static async forRootAsync(
        options: RedisModuleOptions,
    ): Promise<DynamicModule> {
        const providers: Provider[] = [
            RedisService,
            {
                provide: REDIS_TOKEN,
                inject: options.inject,
                useFactory: (...args) => {
                    const opts = options.useFactory(...args);

                    return new Redis(opts);
                },
            },
        ];

        return {
            global: true,
            module: RedisModule,
            imports: options.imports,
            providers,
            exports: providers,
        };
    }
}
