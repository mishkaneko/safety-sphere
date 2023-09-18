import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('user_uuid').notNullable().unique();
    table.string('email').notNullable();
    table.string('user_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
