import {IsString} from "class-validator";

export class GetUserParams {
    @IsString()
    username: string;
}
