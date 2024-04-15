import {Module} from "@nestjs/common";

import {
    CompetitiveMatchesGateway,
    PublicMatchesGateway,
    MatchesGateway,
} from "./gateways";

@Module({
    providers: [
        MatchesGateway,
        CompetitiveMatchesGateway,
        PublicMatchesGateway,
    ],
})
export class MatchesModule {}
