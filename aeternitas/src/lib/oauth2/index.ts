import {DynamicModule, Module, Injectable} from "@nestjs/common";

import {OAuth2GoogleService, OAuth2GithubService} from "./providers";

@Injectable()
export class OAuth2Service {
    constructor(
        public readonly google: OAuth2GoogleService,
        public readonly github: OAuth2GithubService,
    ) {}
}

@Module({
    providers: [OAuth2Service, OAuth2GoogleService, OAuth2GithubService],
    exports: [OAuth2Service],
})
export class OAuth2Module {
    static forRoot(): DynamicModule {
        return {
            module: OAuth2Module,
        };
    }
}
