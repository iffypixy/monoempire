import {RequestHandler} from "express";
import {AnyZodObject, ZodError} from "zod";

import {ws} from "@lib/ws";

interface ValidationSchema {
    body?: AnyZodObject;
    query?: AnyZodObject;
    params?: AnyZodObject;
}

const schema = <T extends ValidationSchema>(schema: T): T => schema;

const check = {
    http:
        (schema: ValidationSchema): RequestHandler =>
        async (req, res, next) => {
            const {body, query, params} = schema;

            try {
                if (body) await body.parseAsync(req.body);
                if (query) await query.parseAsync(req.query);
                if (params) await params.parseAsync(req.params);

                next();
            } catch (e) {
                res.status(400);

                if (e instanceof ZodError) return res.json(e.issues);

                res.json("Unexpected error");
            }
        },
    ws: <T extends AnyZodObject>(schema: T) =>
        ws.middleware((payload, acknowledge) => {
            if (typeof acknowledge !== "function")
                throw new Error("No acknowledge utility provided");

            try {
                schema.parseAsync(payload);
            } catch (e) {
                if (e instanceof ZodError)
                    return acknowledge(false, {
                        msg: "Validation error",
                    });

                acknowledge(false, {
                    msg: "Unexpected error",
                });
            }
        }),
};

export const validation = {check, schema};
