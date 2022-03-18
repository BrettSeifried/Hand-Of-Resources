const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Games');
const { findGameById } = require('../lib/models/Games');

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
    await Game.insert({
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

  it('get a list by id', async () => {
    const game = await Game.insert({
      name: 'Elden Ring',
      type: 'RPG',
      rating: 9,
    });
    const resp = await request(app).get(`/api/v1/games/${game.id}`);

    expect(resp.body).toEqual(game);
  });

  it('Update by ID', async () => {
    const game = await Game.insert({
      name: 'Elden Ring',
      type: 'RPG',
      rating: 9,
    });
    const resp = await request(app)
      .patch(`/api/v1/games/${game.id}`)
      .send({ rating: 8 });
    const expected = {
      id: expect.any(String),
      name: 'Elden Ring',
      type: 'RPG',
      rating: 8,
    };

    expect(resp.body).toEqual(expected);
    expect(await findGameById(game.id)).toEqual(expected);
  });

  it('should delete a game', async () => {
    const game = await Game.insert({
      name: 'Elden Ring',
      type: 'RPG',
      rating: 9,
    });
    const resp = await request(app).delete(`/api/v1/games/${game.id}`);

    expect(resp.body).toEqual(game);
    expect(await findGameById(game.id)).toBeNull();
  });
});
