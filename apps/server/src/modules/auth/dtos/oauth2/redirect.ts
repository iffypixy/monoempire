// import z from "zod";

// import {validation} from "@lib/validation";

// export const GoogleRedirect = validation.schema({
//     query: z.object({
//         code: z.string().nonempty(),
//     }),
// });

// export type GoogleRedirectQuery = z.infer<typeof GoogleRedirect.query>;

import {IsString} from "class-validator";

export class OAuth2RedirectQuery {
    @IsString()
    code: string;
}
