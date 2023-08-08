import {gateway, setup, events, handler} from "./setup";
import {service} from "./service";
import {validate} from "./validation";

export const ws = {service, gateway, setup, validate, events, handler};
