// import z from "zod";

// import {validation} from "@lib/validation";

// export const Login = validation.schema({
//     body: z.object({
//         username: z.string().nonempty(),
//         email: z.string().email(),
//         password: z.string().nonempty(),
//     }),
// });

// export type LoginBody = z.infer<typeof Login.body>;

import {IsEmail, IsString} from "class-validator";

export class LoginBody {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
