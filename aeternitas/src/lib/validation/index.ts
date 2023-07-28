import {RequestHandler} from "express";
import {AnyZodObject, ZodError} from "zod";

interface ValidationSchema {
    body?: AnyZodObject;
    query?: AnyZodObject;
    params?: AnyZodObject;
}

const check =
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
    };

const create = <T extends ValidationSchema>(schema: T): T => schema;

export const validation = {check, create};
