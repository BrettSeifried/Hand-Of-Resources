const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hands-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new keyboard', async () => {
    const resp = await request(app)
      .post('/api/v1/keyboards')
      .send({ brand: 'Logitech', name: 'G915', mech: true });
    expect(resp.body).toEqual({
      id: expect.any(String),
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
  });
});
