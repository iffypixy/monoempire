import http from "http";

import {matches} from "@modules/matches";
import {clusterize} from "@lib/clusterize";
import {ws} from "@lib/ws";

import {app} from "./main";

clusterize(() => {
    const server = http.createServer(app);

    ws.setup(server, [matches.gateways.public, matches.gateways.core]);

    server.listen(8000, () => {
        console.log(`[server #${process.pid}]: running`);
    });
});
