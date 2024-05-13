import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PasswordDto{
    @ApiProperty({
        example: 'oldpassword123',
        description: 'Old password stored in user document',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    readonly oldPassword: string;

    @ApiProperty({
        example: 'newpassword123',
        description: 'New password different from old one',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    readonly newPassword: string;
}