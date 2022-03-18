const { Router } = require('express');
const Game = require('../models/Games');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const game = await Game.insert(req.body);
  res.send(game);
});
