import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

import {OAuth2Provider} from "../provider";

interface OAuth2GithubCredentials {
    id: number;
    login: string;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: any;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

@Injectable()
export class OAuth2GithubService extends OAuth2Provider<OAuth2GithubCredentials> {
    constructor(private readonly config: ConfigService) {
        super({
            authorization: config.get("oauth2.github.authorizationUri")!,
            token: config.get("oauth2.github.token")!,
            scope: config.get("oauth2.github.scope")!,
            client_id: config.get("oauth2.github.client.id")!,
            client_secret: config.get("oauth2.github.client.secret")!,
            redirect_uri: config.get("oauth2.github.redirectUri")!,
            loadCredentials: async (options) => {
                const url = config.get("oauth2.github.credentialsUri")!;

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
