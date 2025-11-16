import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly userEmail: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
