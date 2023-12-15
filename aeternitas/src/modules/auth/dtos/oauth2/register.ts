import {Optional} from "@nestjs/common";
import {IsEmail, IsString} from "class-validator";

export class OAuth2RegisterDto {
    @IsString()
    username: string;

    @Optional()
    @IsEmail()
    email: string;
}
