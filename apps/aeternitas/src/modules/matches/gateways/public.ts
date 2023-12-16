// import Queue from "bull";
// import {Session} from "express-session";

// import {users} from "@modules/users";
// import {validation} from "@lib/validation";
// import {ws} from "@lib/ws";
// import {redis} from "@lib/redis";
// import {utils} from "@lib/utils";
// import {shared} from "@lib/sanitized";
// import {Callback} from "@lib/types";

// import {constants} from "../constants";
// import * as dtos from "../dtos";
// import {Match} from "../lib/match";

// const events = ws.events("public-match", {
//   server: {
//     JOIN_QUEUE: "join-queue",
//   },
//   client: {
//     START: "start",
//     PLAYER_DISCONNECT: "player-disconnect",
//     PLAYER_RECONNECT: "player-reconnect",
//   },
// });

// const queues = {
//   matchmaking: new Queue("public-matchmaking"),
// };

// const startMatchmakingQueue = (cb: Callback) => {
//   queues.matchmaking.process(cb);

//   queues.matchmaking.add(null, {
//     repeat: {
//       every: constants.MATCHMAKING_INTERVAL,
//     },
//   });
// };

// export type PublicMatchmakingQueue = {
//   id: Session["id"];
//   username: string;
// }[];

// export const gateway = ws.gateway((io) => {
//   const service = ws.service.init(io);

//   startMatchmakingQueue(async () => {
//     const queue =
//       (await redis.service.get<PublicMatchmakingQueue>(
//         constants.redis.matchmaking.PUBLIC_QUEUE
//       )) || [];

//     const groups = utils.splitArray(queue, constants.MAX_PLAYERS);

//     const ready = groups.filter(
//       (group) => group.length >= constants.MIN_PLAYERS
//     );

//     ready.forEach(async (group) => {
//       const players = group.map((user) => ({
//         ...user,
//         avatar: users.lib.avatars.random(),
//         user: null,
//       }));

//       const match = Match.init({type: "public", players});

//       await redis.service.set(match.id, match);

//       match.players.forEach((player) => {
//         const sockets = service.getSocketsByUserId(player.id);

//         sockets.forEach((socket) => {
//           socket.join(match.id);

//           socket.on("disconnect", () => {
//             const sockets = service.getSocketsByUserId(player.id);

//             const isDisconnected = sockets.length === 0;

//             if (isDisconnected) {
//               io.to(match.id).emit(events.client.PLAYER_DISCONNECT, {
//                 playerId: player.id,
//               });
//             }
//           });

//           socket.on("reconnect", () => {
//             const sockets = service
//               .getSocketsByUserId(player.id)
//               .filter((s) => s.id !== socket.id);

//             const isDisconnected = sockets.length === 0;

//             if (isDisconnected) {
//               io.to(match.id).emit(events.client.PLAYER_RECONNECT, {
//                 playerId: player.id,
//               });
//             }
//           });
//         });
//       });

//       io.to(match.id).emit(events.client.START, {
//         match: shared.match(match),
//       });
//     });

//     const updated = groups
//       .filter((group) => !(group.length >= constants.MIN_PLAYERS))
//       .flat();

//     await redis.service.set<PublicMatchmakingQueue>(
//       constants.redis.matchmaking.PUBLIC_QUEUE,
//       updated
//     );
//   });

//   io.on("connection", async (socket) => {
//     socket.on(
//       events.server.JOIN_QUEUE,
//       ws.handler<dtos.JoinPublicQueue>(
//         [validation.check.ws(dtos.JoinPublicQueue)],
//         async (payload, acknowledge) => {
//           const queue =
//             (await redis.service.get<PublicMatchmakingQueue>(
//               constants.redis.matchmaking.PUBLIC_QUEUE
//             )) || [];

//           const isQueued = queue.some(
//             ({id}) => id === socket.request.session.id
//           );

//           if (isQueued)
//             return acknowledge(false, {
//               msg: "You are already enqueued",
//             });

//           queue.push({
//             id: socket.request.session.id,
//             username: payload.username,
//           });

//           return acknowledge(true);
//         }
//       )
//     );
//   });
// });

import {WebSocketGateway} from "@nestjs/websockets";

@WebSocketGateway()
export class PublicMatchesGateway {}
