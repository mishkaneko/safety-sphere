import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileInformationDto } from './user-profile.dto';
import { knex } from '../knex';

@Injectable()
export class UserProfileService {
  constructor() {}

  async postProfileInformation(dto: CreateProfileInformationDto) {
    try {
      await knex('user').insert({
        user_name: dto.user_name,
        user_phone: dto.user_phone,
        notes: dto.notes,
        emerg_name: dto.emerg_name,
        emerg_relation: dto.emerg_relation,
        emerg_phone: dto.emerg_phone,
        emerg_address: dto.emerg_address,
      });
      return { message: 'Profile information saved into db' };
    } catch (error) {
      throw Error(error);
    }
  }

  async getProfileInformation() {
    try {
      let profile = await knex('user')
        .select(
          'user_name',
          'user_phone',
          'notes',
          'emerg_name',
          'emerg_phone',
          'emerg_relation',
          'emerg_address',
        )
        // Might have to change user_id here
        .where('id', 1)
        .first();
      if (!profile) {
        throw new NotFoundException('user not found');
      }
      return profile;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateProfileInformation(dto: CreateProfileInformationDto) {
    try {
      await knex('user')
        .update({
          user_name: dto.user_name,
          user_phone: dto.user_phone,
          notes: dto.notes,
          emerg_name: dto.emerg_name,
          emerg_relation: dto.emerg_relation,
          emerg_phone: dto.emerg_phone,
          emerg_address: dto.emerg_address,
        })
        // Might have to change user_id here
        .where('id', 1);
      return { message: 'Profile information in db updated' };
    } catch (error) {
      throw Error(error);
    }
  }
}
