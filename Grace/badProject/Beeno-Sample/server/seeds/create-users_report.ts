import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users_report').del();

  // Inserts seed entries
  await knex('users_report').insert([
    {
      user_id: '1',
      incident_type: '1',
      date: '2023-08-29',
      time: '11:30 a.m.',
      longitude: '22.319306',
      latitude: '114.168219',
      description:
        'While at the Mong Kok MTR station, I witnessed a physical assault incident unfold.',
    },
    {
      user_id: '2',
      incident_type: '2',
      date: '2023-08-30',
      time: '12:30 n.n.',
      longitude: '22.292778',
      latitude: '114.175833',
      description:
        'While moving through the mall, I encountered an agitated individual who appeared to be in their mid-40s.',
    },
  ]);
}
