const pool = require('../utils/pool');

module.exports = class Car {
  id;
  name;
  model;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.model = row.model;
  }

  static async insert({ name, model }) {
    const { rows } = await pool.query(
      'INSERT INTO cars(name, model) VALUES ($1, $2) RETURNING *;',
      [name, model]
    );
    return new Car(rows[0]);
  }
};
