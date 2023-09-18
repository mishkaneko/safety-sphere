import { IsString } from 'class-validator';

export class CreateFollowDto {
  @IsString()
  email: string;

  @IsString()
  userUuid: string;
}

export class RetrieveAllDto {
  @IsString()
  currentUserUuid: string;
}

export class DeleteFollowDto {
  @IsString()
  currentUserUuid: string;

  @IsString()
  followUuid: string;
}