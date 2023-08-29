import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_report', (table) => {
    table.increments();
    table.string('user_id');
    table.string('incident_type');
    table.string('date');
    table.string('time');
    table.string('longitude');
    table.string('latitude');
    table.string('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_report');
}
