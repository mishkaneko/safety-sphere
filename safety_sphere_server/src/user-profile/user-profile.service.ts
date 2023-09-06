import { Injectable } from '@nestjs/common';
import { CreateProfileInformationDto } from './user-profile.dto';
import { knex } from '../knex';

@Injectable()
export class UserProfileService {
  constructor() {}

  async postProfileInformation(dto: CreateProfileInformationDto) {
    try {
      await knex('user').insert({
        user_name: dto.userName,
        user_phone: dto.userPhone,
        notes: dto.notes,
        emerg_name: dto.emergName,
        emerg_relation: dto.emergRelation,
        emerg_phone: dto.emergPhone,
        emerg_address: dto.emergAddress,
      });
      return { message: 'Profile information saved into db' };
    } catch (error) {
      throw Error(error);
    }
  }
}
