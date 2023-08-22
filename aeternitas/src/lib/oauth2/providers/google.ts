import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

import {OAuth2Provider} from "../provider";

interface OAuth2GoogleCredentials {
    id: number;
    email: string;
    verified_email: boolean;
}

@Injectable()
export class OAuth2GoogleService extends OAuth2Provider<OAuth2GoogleCredentials> {
    constructor(private readonly config: ConfigService) {
        super({
            authorization: config.get("oauth2.google.authorizationURI")!,
            token: config.get("oauth2.google.token")!,
            scope: config.get("oauth2.google.scope")!,
            client_id: config.get("oauth2.google.client.id")!,
            client_secret: config.get("oauth2.google.client.secret")!,
            redirect_uri: config.get("oauth2.google.redirectURI")!,
            loadCredentials: async (options) => {
                const url = config.get("oauth2.google.credentialsURI")!;

                const res = await axios.get<OAuth2GoogleCredentials>(url, {
                    params: {
                        alt: "json",
                        access_token: options.access_token,
                    },
                });

                return res.data;
            },
        });
    }
}
