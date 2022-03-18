const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Games');

async function createGame({ name, type, rating }) {
  const { rows } = await pool.query(
    'INSERT INTO games(name, type, rating) VALUES ($1, $2, $3) RETURNING *;',
    [name, type, rating]
  );
  return new Game(rows[0]);
}

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

  it('should list all games', async () => {
    await createGame({
      name: 'Elden Ring',
      type: 'RPG',
      rating: 9,
    });
    const resp = await request(app).get('/api/v1/games');

    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        name: 'Elden Ring',
        type: 'RPG',
        rating: 9,
      },
    ]);
  });
});
