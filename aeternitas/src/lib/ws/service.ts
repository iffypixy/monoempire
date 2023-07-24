import {User} from "@prisma/client";
import {Server} from "socket.io";

const init = (io: Server) => {
    const getAllSockets = () => {
        const global = io.of("/");

        return Array.from(global.sockets.values());
    };

    const getSocketsByUserId = (id: User["id"]) => {
        const sockets = getAllSockets();

        return sockets.filter((socket) => socket.request.session.userId === id);
    };

    return {getAllSockets, getSocketsByUserId};
};

export const service = {init};
