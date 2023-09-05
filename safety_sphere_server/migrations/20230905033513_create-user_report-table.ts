import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_report', (table) => {
    table.increments();
    table.integer('user_id').notNullable().unsigned();
    table.integer('incident_id').notNullable().unsigned();
    table.string('date').notNullable();
    table.string('time').notNullable();
    table.string('longitude').notNullable();
    table.string('latitude').notNullable();
    table.string('description').notNullable();
    table.foreign('user_id').references('user.id');
    table.foreign('incident_id').references('incident_type.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_report');
}
