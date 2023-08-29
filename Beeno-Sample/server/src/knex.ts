import { env } from '../env';
import Knex from 'knex';

let profile = require('../knexfile')[env.NODE_ENV];

// console.log('knex profile:', profile);

export let knex = Knex(profile);
