import { CreateProfileInformationDto } from './user-profile.dto';
import { UserProfileService } from './user-profile.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  // Might have to turn this put
  @Post('/')
  postProfileInformation(
    @Body() createProfileInformationDto: CreateProfileInformationDto,
  ) {
    return this.userProfileService.postProfileInformation(
      createProfileInformationDto,
    );
  }

  @Get('/')
  getProfileInformation() {
    return this.userProfileService.getProfileInformation();
  }

  @Put('/')
  updateProfileInformation(
    @Body() createProfileInformationDto: CreateProfileInformationDto,
  ) {
    return this.userProfileService.updateProfileInformation(
      createProfileInformationDto,
    );
  }
}
