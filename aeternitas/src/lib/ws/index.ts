import {gateway, setup, events, handler} from "./setup";
import {service} from "./service";
import {mws} from "./middlewares";

export const ws = {service, gateway, setup, mws, events, handler};
