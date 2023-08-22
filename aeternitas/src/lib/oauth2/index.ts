import {DynamicModule, Module, Injectable} from "@nestjs/common";

import {OAuth2GoogleService} from "./providers";

@Injectable()
export class OAuth2Service {
    constructor(public readonly google: OAuth2GoogleService) {}
}

@Module({
    providers: [OAuth2Service, OAuth2GoogleService],
    exports: [OAuth2Service],
})
export class OAuth2Module {
    static forRoot(): DynamicModule {
        return {
            module: OAuth2Module,
        };
    }
}
