import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {

  @IsEmail()
  @ApiProperty({example: 'admin@example.com'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({example: 'adminadmin'})
  password: string;
}

export default LoginDto;
