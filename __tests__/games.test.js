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

  it('should create a game', async () => {
    const resp = await request(app)
      .post('/api/v1/games')
      .send({ name: 'Elden Ring', type: 'RPG', rating: 9 });

    expect(resp.body).toEqual({
      id: expect.any(String),
      name: 'Elden Ring',
      type: 'RPG',
      rating: 9,
    });
  });
});
