import {IsEmail, IsString} from "class-validator";

export class VerifyUsernameDto {
    @IsString()
    username: string;
}

export class VerifyEmailDto {
    @IsEmail()
    email: string;
}
