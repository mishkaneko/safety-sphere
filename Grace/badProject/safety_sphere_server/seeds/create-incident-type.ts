import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('incident_type').del();

  // Inserts seed entries
  await knex('incident_type').insert([
    { incident: '肢體襲擊' },
    { incident: '言語威脅' },
    { incident: '非禮/性侵犯' },
    { incident: '可疑人物' },
    { incident: '盜竊' },
    { incident: '高空墮物' },
    { incident: '野生動物襲擊' },
    { incident: '其他' },
  ]);
}
