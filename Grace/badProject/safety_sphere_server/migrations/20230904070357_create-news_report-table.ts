import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('news_report', (table) => {
    table.increments();
    table.integer('incident_id').notNullable().unsigned();
    table.string('location').notNullable();
    table.float('latitude');
    table.float('longitude');
    table.string('title').notNullable();
    table.string('source').notNullable();
    table.string('summary').notNullable();
    table.string('website').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('incident_id').references('incident_type.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('news_report');
}
