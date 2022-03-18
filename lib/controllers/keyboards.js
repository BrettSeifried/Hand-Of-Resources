const { Router } = require('express');
const Keyboard = require('../models/Keyboards');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const keyboard = await Keyboard.insert(req.body);
  res.send(keyboard);
});
