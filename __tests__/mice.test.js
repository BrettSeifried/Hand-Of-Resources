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

  it('should be create a mouse', async () => {
    const resp = await request(app)
      .post('/api/v1/mice')
      .send({ brand: 'Logitech', name: 'MX Master 3', price: 80 });

    expect(resp.body).toEqual({
      id: expect.any(String),
      brand: 'Logitech',
      name: 'MX Master 3',
      price: 80,
    });
  });
});
