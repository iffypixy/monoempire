// import z from "zod";

// import {validation} from "@lib/validation";

// export const Register = validation.schema({
//     body: z.object({
//         username: z
//             .string()
//             .min(4)
//             .max(18)
//             .regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
//         email: z.string().email(),
//         password: z.string().min(8).max(50),
//     }),
// });

// export type RegisterBody = z.infer<typeof Register.body>;

import {IsEmail, IsString} from "class-validator";

export class RegisterBody {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
