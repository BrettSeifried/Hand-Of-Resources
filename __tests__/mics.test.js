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

  it('creates a mic', async () => {
    const expected = {
      name: 'Rode Pod Mic',
      input: 'XLR',
      price: 100,
    };
    const resp = await request(app)
      .post('/api/v1/mics')
      .send({ name: 'Rode Pod Mic', input: 'XLR', price: 100 });
    expect(resp.body).toEqual({ id: expect.any(String), ...expected });
  });
});
