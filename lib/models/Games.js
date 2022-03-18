const pool = require('../utils/pool');

module.exports = class Game {
  id;
  name;
  type;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.rating = row.rating;
  }

  static async insert({ name, type, rating }) {
    const { rows } = await pool.query(
      'INSERT INTO games(name, type, rating) VALUES ($1, $2, $3) RETURNING *;',
      [name, type, rating]
    );
    return new Game(rows[0]);
  }
};
