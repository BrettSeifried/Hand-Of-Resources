const { Router } = require('express');
const Keyboard = require('../models/Keyboards');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const keyboard = await Keyboard.insert(req.body);
    res.send(keyboard);
  })

  .get('/', async (req, res) => {
    const keyboard = await Keyboard.findAll();
    res.send(keyboard);
  })

  .get('/:id', async (req, res) => {
    const keyboard = await Keyboard.findById(req.params.id, req.body);
    res.send(keyboard);
  });
