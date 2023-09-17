import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_report', (table) => {
    table.increments();
    table.integer('user_id').notNullable().unsigned();
    table.integer('incident_id').notNullable().unsigned();
    table.timestamp('date').notNullable();
    table.timestamp('time').notNullable();
    table.string('location').notNullable();
    table.float('longitude').notNullable();
    table.float('latitude').notNullable();
    table.string('description').notNullable();
    table.foreign('user_id').references('user.id');
    table.foreign('incident_id').references('incident_type.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_report');
}
