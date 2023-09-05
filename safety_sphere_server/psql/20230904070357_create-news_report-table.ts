import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('news_report', (table) => {
    table.increments();
    table.integer('incident_id').notNullable().unsigned();
    table.string('news_source').notNullable();
    table.string('news_date').notNullable();
    table.string('incident_date');
    table.string('incident_time');
    table.string('longitude').notNullable();
    table.string('latitude').notNullable();
    table.string('content').notNullable();
    table.foreign('incident_id').references('incident_type.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('news_report');
}
