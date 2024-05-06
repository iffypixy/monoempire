interface WsGenericResponse {
    ok: boolean;
}

interface WsResponseFulfilled extends WsGenericResponse {
    ok: true;
    payload: unknown;
}

interface WsResponseRejected extends WsGenericResponse {
    ok: false;
    msg: string;
}

export type WsResponse = WsResponseFulfilled | WsResponseRejected;

export const acknowledge = (res: WsResponse) => res;
