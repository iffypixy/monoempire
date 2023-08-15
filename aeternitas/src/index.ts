import {clusterize} from "@lib/clusterize";

import {matches} from "@modules/matches";
import {ws} from "@lib/ws";

import {server} from "./main";

clusterize(() => {
    ws.setup(server, [matches.gateways.public, matches.gateways.core]);

    server.listen(8000, () => {
        console.log(`[server #${process.pid}]: running`);
    });
});
