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

async function getMicById(id) {
  const { rows } = await pool.query(
    `SELECT
      *
    FROM
      mics
    WHERE
      id=$1
    `,
    [id]
  );
  if (!rows[0]) return null;
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

  it('find mic by ID', async () => {
    const mic = await Mic.findById(1);
    const resp = await request(app).get(`/api/v1/mics/${mic.id}`);

    expect(resp.body).toEqual(mic);
  });

  it('Updates Mic by id', async () => {
    const mic = await createMic({
      name: 'Rode Pod Mic',
      input: 'XLR',
      price: 100,
    });
    const resp = await request(app)
      .patch(`/api/v1/mics/${mic.id}`)
      .send({ price: 82 });

    const expected = {
      id: expect.any(String),
      name: 'Rode Pod Mic',
      input: 'XLR',
      price: 82,
    };

    expect(resp.body).toEqual(expected);
    expect(await getMicById(mic.id)).toEqual(expected);
  });
});
