import {WebSocketGateway, OnGatewayInit} from "@nestjs/websockets";

@WebSocketGateway()
export class MatchesGateway implements OnGatewayInit {
    afterInit() {}
}
