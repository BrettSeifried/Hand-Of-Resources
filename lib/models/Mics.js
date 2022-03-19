const pool = require('../utils/pool');

module.exports = class Mic {
  id;
  name;
  input;
  price;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.input = row.input;
    this.price = row.price;
  }

  static async insert({ name, input, price }) {
    const { rows } = await pool.query(
      `
INSERT INTO 
    mics(name, input, price) 
VALUES 
    ($1, $2, $3) 
RETURNING 
*;
`,
      [name, input, price]
    );
    return new Mic(rows[0]);
  }
  static async findAll() {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        mics
        `
    );
    return rows.map((row) => new Mic(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          mics
        WHERE
          id=$1;
        `,
      [id]
    );
    return new Mic(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentMic = await Mic.findById(id);
    const updateAtts = { ...currentMic, ...attributes };
    const { name, input, price } = updateAtts;
    const { rows } = await pool.query(
      `UPDATE 
          mics
        SET
          name=$2,
          input=$3,
          price=$4
        WHERE
          id=$1
        RETURNING *;
        `,
      [id, name, input, price]
    );
    return new Mic(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM
        mics
      WHERE
        id=$1
      RETURNING 
        *;
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Mic(rows[0]);
  }
};
