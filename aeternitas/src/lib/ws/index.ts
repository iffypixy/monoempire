import {createGateway, setup} from "./setup";
import {service} from "./service";
import {createEvents} from "./events";
import {validate} from "./validation";

export const ws = {service, createGateway, setup, validate, createEvents};
