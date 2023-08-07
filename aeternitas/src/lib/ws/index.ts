import {gateway, setup} from "./setup";
import {service} from "./service";
import {events} from "./events";
import {validate} from "./validation";

export const ws = {service, gateway, setup, validate, events};
