import {router, route} from "./auth.controller";
import * as guards from "./auth.guard";

export const auth = {router, route, guards};
