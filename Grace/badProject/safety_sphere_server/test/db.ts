import { knex } from '../src/knex';

knex
  .insert({ big: '2023-09-14T08:01:52.479Z', mid: 234 })
  .into('knex_test')
  .then((res) => {
    console.log(res);
  })
  .catch((e) => console.error(e))
  .finally(() => knex.destroy());
