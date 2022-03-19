const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Cars');

async function createCar({ name, model }) {
  const { rows } = await pool.query(
    'INSERT INTO cars(name, model) VALUES ($1, $2) RETURNING *;',
    [name, model]
  );
  return new Car(rows[0]);
}

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

  it('should list all cars', async () => {
    await createCar({
      name: 'Mclaren',
      model: '720s',
    });
    const resp = await request(app).get('/api/v1/cars');

    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        name: 'Mclaren',
        model: '720s',
      },
    ]);
  });
});
