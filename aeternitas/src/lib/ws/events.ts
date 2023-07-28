interface WsEvents {
    server: Record<string, string>;
    client: Record<string, string>;
}

export const createEvents = <T extends WsEvents>(
    prefix: string,
    events: T,
): T => {
    const modified = {
        server: {},
        client: {},
    } as WsEvents;

    Object.keys(events.server).forEach((prop) => {
        modified.server[prop] = `${prefix}:${events.server[prop]}`;
    });

    Object.keys(events.client).forEach((prop) => {
        modified.client[prop] = `${prefix}:${events.client[prop]}`;
    });

    return modified as T;
};
