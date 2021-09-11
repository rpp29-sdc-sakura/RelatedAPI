const { pool, getIds } = require('./../apiServer/databaseHelpers/postgresHelper.js');

describe('Postgres Helper', () => {

  test('connects to correct database', () => {
    expect(pool.options.database).toBe('loom_related');
    expect(pool.ended).toBe(false);
  });

  test('returns an array', () => {
    return getIds(1)
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);
      });
  });

  test('returns corresponding product IDs', () => {
    return getIds(1)
      .then((result) => {
        expect(JSON.stringify(result)).toBe('[2,3,8,7]');
      });
  });

});