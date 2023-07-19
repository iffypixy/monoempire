import z from "zod";

export const Register = {
    body: z.object({
        username: z
            .string()
            .min(4)
            .max(18)
            .regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
        email: z.string().email(),
        password: z.string().min(8).max(50),
    }),
};

export type RegisterBody = z.infer<typeof Register.body>;
