import {IsString} from "class-validator";

export class JoinPublicQueue {
    @IsString()
    username: string;
}
