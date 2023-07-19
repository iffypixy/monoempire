import z from "zod";

export const Login = {
    body: z.object({
        username: z.string().nonempty(),
        email: z.string().email(),
        password: z.string().nonempty(),
    }),
};

export type LoginBody = z.infer<typeof Login.body>;
