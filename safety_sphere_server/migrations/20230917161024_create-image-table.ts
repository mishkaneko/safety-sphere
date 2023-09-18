import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('image', (table) => {
    table.increments();
    table.integer('user_report_id').notNullable().unsigned();
    table.text('image_string').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('image');
}