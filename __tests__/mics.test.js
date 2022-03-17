const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Mic = require('../lib/models/Mics');

async function createMic({ name, input, price }) {
  const { rows } = await pool.query(
    `INSERT INTO 
      mics(name, input, price) 
    VALUES 
      ($1, $2, $3) 
    RETURNING 
      *;`,
    [name, input, price]
  );
  return new Mic(rows[0]);
}

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
    const resp = await request(app).post('/api/v1/mics').send(expected);

    expect(resp.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('fetches all data', async () => {
    const expected = await Mic.findAll();
    const resp = await request(app).get('/api/v1/mics');

    expect(resp.body).toEqual(expected);
  });
});
