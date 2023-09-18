import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('emerg_contact', (table) => {
    table.increments();
    table.string('current_user_uuid').notNullable();
    table.string('emerg_contact_uuid').notNullable();
    table.foreign('current_user_uuid').references('user.user_uuid');
    table.foreign('emerg_contact_uuid').references('user.user_uuid');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('emerg_contact');
}
