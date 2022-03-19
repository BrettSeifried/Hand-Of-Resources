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

  static async findGameById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id=$1', [id]);

    if (!rows[0]) return null;
    return new Game(rows[0]);
  }

  static async updateGameById(id, atrributes) {
    const currentGame = await Game.findGameById(id);
    const updateAtts = { ...currentGame, ...atrributes };
    const { name, type, rating } = updateAtts;
    const { rows } = await pool.query(
      'UPDATE games SET name=$2, type=$3, rating=$4 WHERE id=$1 RETURNING *',
      [id, name, type, rating]
    );
    return new Game(rows[0]);
  }

  static async deleteGameById(id) {
    const { rows } = await pool.query(
      'DELETE FROM games WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Game(rows[0]);
  }
};
