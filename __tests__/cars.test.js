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

  it('should be able to create a car', async () => {
    const resp = await request(app)
      .post('/api/v1/cars')
      .send({ name: 'Mclaren', model: '720s' });

    expect(resp.body).toEqual({
      id: expect.any(String),
      name: 'Mclaren',
      model: '720s',
    });
  });
});
