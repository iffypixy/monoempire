import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Request} from "express";
import {Socket} from "socket.io";

@Injectable()
export class IsHTTPAuthenticated implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        return !!request.session.userId;
    }
}

@Injectable()
export class IsWSAuthenticated implements CanActivate {
    canActivate(context: ExecutionContext) {
        const socket = context.switchToWs().getClient() as Socket;

        return !!socket.request.session.userId;
    }
}
