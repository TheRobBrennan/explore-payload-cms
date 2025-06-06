import * as migration_20250604_190633 from './20250604_190633';

export const migrations = [
  {
    up: migration_20250604_190633.up,
    down: migration_20250604_190633.down,
    name: '20250604_190633'
  },
];
