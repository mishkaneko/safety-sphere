import { CreateProfileInformationDto } from './user-profile.dto';
import { UserProfileService } from './user-profile.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  // @Post('updateUserName')
  // async updateUserName(@Body() userDto: UserDto) {
  //   console.log('post updateUserName')
  //   await this.userProfileService.updateUserName(userDto)
  // }

  // Might have to turn this put
  @Post('/')
  postProfileInformation(
    @Body() createProfileInformationDto: CreateProfileInformationDto,
  ) {
    console.log('postProfileInformation')
    return this.userProfileService.postProfileInformation(
      createProfileInformationDto,
    );
  }

  @Get('/')
  async getProfileInformation() {
    let profileInformation = await this.userProfileService.getProfileInformation();
    console.log('profileInformation: ', profileInformation);
    let convertedProfileInformation = [
      {
        name: 'username',
        key: 'userName',
        value: profileInformation.user_name,
      },
      {
        name: 'user phone no.',
        key: 'userPhone',
        value: profileInformation.user_phone,
      },
      {
        name: 'user notes',
        key: 'notes',
        value: profileInformation.notes,
      },
      {
        name: 'emergency contact name',
        key: 'emergName',
        value: profileInformation.emerg_name,
      },
      {
        name: 'emergency phone',
        key: 'emergPhone',
        value: profileInformation.emerg_phone,
      },
      {
        name: 'emergency relation',
        key: 'emergRelation',
        value: profileInformation.emerg_relation,
      },
      {
        name: 'emergency address',
        key: 'emergAddress',
        value: profileInformation.emerg_address,
      },
    ];
    return convertedProfileInformation;
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
