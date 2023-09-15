import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('knex_test', (table) => {
    table.increments();
    table.bigint('big').unsigned();
    table.integer('mid').unsigned();
    table.bigInteger('big2').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('knex_test');
}
