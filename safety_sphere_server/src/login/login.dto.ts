import { IsString } from 'class-validator';

export class CreateVerificationCodeDto {
  @IsString()
  email: string;
}

export class LoginDto {
  // @IsString()
  // email: string;

  @IsString()
  userUuid: string;
}

export class VerifyEmailExistDto {
  @IsString()
  email: string;
}

export class RegisterDto {
  @IsString()
  email: string;
}