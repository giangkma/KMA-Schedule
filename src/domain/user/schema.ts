import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthInfo {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
