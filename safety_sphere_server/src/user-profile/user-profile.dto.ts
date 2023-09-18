import { IsString, IsObject } from 'class-validator';

export class CreateProfileInformationDto {
  @IsString()
  user_name: string;

  @IsString()
  user_phone: string;

  @IsString()
  notes: string;

  @IsString()
  emerg_name: string;

  @IsString()
  emerg_relation: string;

  @IsString()
  emerg_phone: string;

  @IsString()
  emerg_address: string;
}

// export class UserDto {
//   @IsString()
//   name: string;

//   @IsString()
//   userUuid: string;
// }