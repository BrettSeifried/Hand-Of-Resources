const { Router } = require('express');
const Game = require('../models/Games');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const game = await Game.insert(req.body);
    res.send(game);
  })

  .get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM games;');
    const games = rows.map((row) => new Game(row));

    res.send(games);
  });
