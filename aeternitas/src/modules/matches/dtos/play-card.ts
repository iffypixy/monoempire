import {IsString} from "class-validator";

export class PlayCard {
    @IsString()
    matchId: string;

    @IsString()
    cardId: string;
}
