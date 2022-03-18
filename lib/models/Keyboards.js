const pool = require('../utils/pool');

module.exports = class Keyboard {
  id;
  brand;
  name;
  mech;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.name = row.name;
    this.mech = row.mech;
  }

  static async insert({ brand, name, mech }) {
    const { rows } = await pool.query(
      'INSERT INTO keyboards(brand, name, mech) VALUES ($1, $2, $3) RETURNING *;',
      [brand, name, mech]
    );
    return new Keyboard(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM keyboards;');
    return rows.map((row) => new Keyboard(row));
  }

  static async findKeyboardById(id) {
    const { rows } = await pool.query('SELECT * FROM keyboards WHERE id=$1;', [
      id,
    ]);
    return new Keyboard(rows[0]);
  }

  static async updateKeyboardById(id, attributes) {
    const currentKeyboard = await Keyboard.findKeyboardById(id);
    const updateAtts = { ...currentKeyboard, ...attributes };
    const { brand, name, mech } = updateAtts;
    const { rows } = await pool.query(
      'UPDATE keyboards SET brand=$2, name=$3, mech=$4 WHERE id=$1 RETURNING *;',
      [id, brand, name, mech]
    );
    return new Keyboard(rows[0]);
  }
};
