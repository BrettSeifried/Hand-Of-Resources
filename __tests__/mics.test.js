const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Mic = require('../lib/models/Mics');
const { findById } = require('../lib/models/Mics');

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
    const mic = await Mic.insert({
      name: 'Rode Pod Mic',
      input: 'XLR',
      price: 100,
    });
    const resp = await request(app).get(`/api/v1/mics/${mic.id}`);

    expect(resp.body).toEqual(mic);
  });

  it('Updates Mic by id', async () => {
    const mic = await Mic.insert({
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
    expect(await findById(mic.id)).toEqual(expected);
  });

  it('should be able to delete an order', async () => {
    const mic = await Mic.insert({
      name: 'Rode Pod Mic',
      input: 'XLR',
      price: 100,
    });
    const resp = await request(app).delete(`/api/v1/mics/${mic.id}`);
    expect(resp.body).toEqual(mic);
  });
});
