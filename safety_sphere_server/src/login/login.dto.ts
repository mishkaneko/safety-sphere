import { IsString, IsObject, IsArray, IsDateString } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
