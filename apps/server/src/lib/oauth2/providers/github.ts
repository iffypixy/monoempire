import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

import {OAuth2Provider} from "../provider";

interface OAuth2GithubCredentials {
    id: number;
}

@Injectable()
export class OAuth2GithubService extends OAuth2Provider<OAuth2GithubCredentials> {
    constructor(private readonly config: ConfigService) {
        super({
            authorization: config.get("oauth2.github.authorizationURI")!,
            token: config.get("oauth2.github.token")!,
            scope: config.get("oauth2.github.scope")!,
            client_id: config.get("oauth2.github.client.id")!,
            client_secret: config.get("oauth2.github.client.secret")!,
            redirect_uri: config.get("oauth2.github.redirectURI")!,
            loadCredentials: async (options) => {
                const url = config.get("oauth2.github.credentialsURI")!;

                const res = await axios.get<OAuth2GithubCredentials>(url, {
                    headers: {
                        Authorization: `Bearer ${options.access_token}`,
                    },
                });

                return res.data;
            },
        });
    }
}
