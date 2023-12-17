import {Module} from "@nestjs/common";

import {
    CompetitiveMatchesGateway,
    PublicMatchesGateway,
    MatchesCoreGateway,
} from "./gateways";

@Module({
    providers: [
        MatchesCoreGateway,
        CompetitiveMatchesGateway,
        PublicMatchesGateway,
    ],
})
export class MatchesModule {}
