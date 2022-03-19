const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Keyboard = require('../lib/models/Keyboards');
const { findKeyboardById } = require('../lib/models/Keyboards');

async function createKeyboard({ brand, name, mech }) {
  const { rows } = await pool.query(
    'INSERT INTO keyboards(brand, name, mech) VALUES ($1, $2, $3) RETURNING *;',
    [brand, name, mech]
  );
  return new Keyboard(rows[0]);
}

async function getKeyBoardById(id) {
  const { rows } = await pool.query('SELECT * FROM keyboards WHERE id=$1', [
    id,
  ]);
  if (!rows[0]) return null;
  return new Keyboard(rows[0]);
}

describe('hands-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new keyboard', async () => {
    const resp = await request(app)
      .post('/api/v1/keyboards')
      .send({ brand: 'Logitech', name: 'G915', mech: true });
    expect(resp.body).toEqual({
      id: expect.any(String),
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
  });

  it('list all keyboards', async () => {
    await createKeyboard({
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
    const resp = await request(app).get('/api/v1/keyboards');

    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        brand: 'Logitech',
        name: 'G915',
        mech: true,
      },
    ]);
  });

  it('find a keyboard by id', async () => {
    const keyboard = await createKeyboard({
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
    const resp = await request(app).get(`/api/v1/keyboards/${keyboard.id}`);

    expect(resp.body).toEqual(keyboard);
  });

  it('updates a keyboard by id', async () => {
    const keyboard = await createKeyboard({
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
    const resp = await request(app)
      .patch(`/api/v1/keyboards/${keyboard.id}`)
      .send({ name: 'G915 TKL' });
    const expected = {
      id: expect.any(String),
      brand: 'Logitech',
      name: 'G915 TKL',
      mech: true,
    };

    expect(resp.body).toEqual(expected);
    expect(await findKeyboardById(keyboard.id)).toEqual(expected);
  });

  it('should be able to delete a Keyboard', async () => {
    const keyboard = await createKeyboard({
      brand: 'Logitech',
      name: 'G915',
      mech: true,
    });
    const resp = await request(app).delete(`/api/v1/keyboards/${keyboard.id}`);

    expect(resp.body).toEqual(keyboard);
    expect(await getKeyBoardById(keyboard.id)).toBeNull();
  });
});
