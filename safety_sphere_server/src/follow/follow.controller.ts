import { Controller, Post, Body } from '@nestjs/common';
import { CreateFollowDto, RetrieveAllDto, DeleteFollowDto } from './follow.dto'
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}
  
  @Post('create')
  async createFollow(@Body() createFollowDto: CreateFollowDto) {
    const { doesUserExist, result } = await this.followService.findUser(createFollowDto)
    if (doesUserExist) await this.followService.newEmergencyContact({
      currentUserUuid: createFollowDto.userUuid, emergContactUuid: result[0].user_uuid
    })
    return { succeedToCreate: doesUserExist, emergContact: result }
  }

  @Post('retrieve-all')
  async retrieveAll(@Body() retrieveAllDto: RetrieveAllDto) {
    return await this.followService.findAllEmergContact(retrieveAllDto.currentUserUuid)
  }

  @Post('delete')
  async deleteFollow(@Body() deleteFollowDto: DeleteFollowDto) {
    console.log('Post delete')
    await this.followService.deleteFollow(deleteFollowDto)
  }
}
