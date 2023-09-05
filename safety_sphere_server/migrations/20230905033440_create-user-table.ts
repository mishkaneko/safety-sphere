import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('user_name').notNullable();
    table.string('user_phone').notNullable();
    table.string('notes').notNullable();
    table.string('emerg_name').notNullable();
    table.string('emerg_phone').notNullable();
    table.string('emerg_relation').notNullable();
    table.string('emerg_address').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
