import { IsString, IsObject } from 'class-validator';

export class CreateProfileInformationDto {
  @IsString()
  userName: string;

  @IsString()
  userPhone: string;

  @IsString()
  notes: string;

  @IsString()
  emergName: string;

  @IsString()
  emergRelation: string;

  @IsString()
  emergPhone: string;

  @IsString()
  emergAddress: string;
}
