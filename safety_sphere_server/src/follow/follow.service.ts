import { Injectable } from '@nestjs/common';
import { knex } from '../knex';
import { CreateFollowDto, DeleteFollowDto } from './follow.dto';

@Injectable()
export class FollowService {
  async findUser (createFollowDto: CreateFollowDto) {
    const result = await knex('user').select('user_uuid').where('email', createFollowDto.email)
    return { doesUserExist: result.length > 0, result }
  }

  async newEmergencyContact (props: { currentUserUuid: string, emergContactUuid: string }) {
    const { currentUserUuid, emergContactUuid } = props
    await knex('emerg_contact').insert({ current_user_uuid: currentUserUuid, emerg_contact_uuid: emergContactUuid })
  }

  async findAllEmergContact (currentUserUuid: string) {
    return await knex('user as u')
      .select(knex.raw(`json_agg(jsonb_build_object('emerg_contact_uuid', ec.emerg_contact_uuid, 'emerg_contact_email', uc.email)) as emerg_contacts`))
      .leftJoin('emerg_contact as ec', 'u.user_uuid', 'ec.current_user_uuid')
      .leftJoin('user as uc', 'ec.emerg_contact_uuid', 'uc.user_uuid')
      .where('u.user_uuid', currentUserUuid)
      .groupBy('u.user_uuid', 'u.user_name', 'u.email')
  }

  async deleteFollow (deleteFollowDto: DeleteFollowDto) {
    await knex('emerg_contact').where('current_user_uuid', deleteFollowDto.currentUserUuid).andWhere('emerg_contact_uuid', deleteFollowDto.followUuid).del()
  }
}
