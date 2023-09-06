import { CreateProfileInformationDto } from './user-profile.dto';
import { UserProfileService } from './user-profile.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Post('user-information')
  postProfileInformation(
    @Body() createProfileInformationDto: CreateProfileInformationDto,
  ) {
    return this.userProfileService.postProfileInformation(
      createProfileInformationDto,
    );
  }
}
