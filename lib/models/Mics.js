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
};
