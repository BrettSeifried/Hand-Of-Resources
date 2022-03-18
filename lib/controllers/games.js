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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const game = await Game.findGameById(req.params.id);
      res.send(game);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const game = await Game.updateGameById(req.params.id, req.body);
    res.send(game);
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const game = await Game.deleteGameById(req.params.id);
      res.send(game);
    } catch (error) {
      next(error);
    }
  });
