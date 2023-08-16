import {gateway, setup, events, handler, guard, middleware} from "./setup";
import {service} from "./service";

export const ws = {
    service,
    gateway,
    setup,
    events,
    handler,
    guard,
    middleware,
};
