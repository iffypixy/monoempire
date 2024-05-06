import {Server, Socket} from "socket.io";

export class WsService {
    constructor(private readonly server: Server) {}

    public getSocket(id: string): Socket | undefined {
        const global = this.server.of("/");

        return global.sockets.get(id);
    }

    public getSockets(userId: string, roomId?: string): Socket[] {
        const global = this.server.of("/");

        let sockets: Socket[] = [];

        if (roomId) {
            const socketIdsInRoom = global.adapter.rooms.get(roomId);

            if (socketIdsInRoom) {
                const ids = Array.from(socketIdsInRoom);

                sockets = ids
                    .map((id) => global.sockets.get(id)!)
                    .filter(Boolean);
            }
        } else {
            sockets = Array.from(global.sockets.values());
        }

        return sockets.filter((s) => s.request.session.user?.id === userId);
    }
}
