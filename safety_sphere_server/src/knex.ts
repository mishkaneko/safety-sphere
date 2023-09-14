import { env } from '../env';
import Knex from 'knex';

let profile = require('../knexfile')[env.NODE_ENV];

export let knex = Knex(profile);
