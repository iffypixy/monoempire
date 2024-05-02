import {IsString} from "class-validator";

export class OAuth2RedirectQuery {
    @IsString()
    code: string;
}

export class SteamOpenIdRedirectQuery {
    "openid.ns": string;
    "openid.mode": string;
    "openid.op_endpoint": string;
    "openid.claimed_id": string;
    "openid.identity": string;
    "openid.return_to": string;
    "openid.response_nonce": string;
    "openid.assoc_handle": string;
    "openid.signed": string;
    "openid.sig": string;
    [key: string]: string;
}
