const pool = require('../utils/pool');
const Mice = require('../models/Mice');
const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res) => {
    const mouse = await Mice.insert(req.body);
    res.send(mouse);
  })

  .get('/', async (req, res) => {
    const mouse = await Mice.findAll();
    res.send(mouse);
  })

  .get('/:id', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM mice WHERE id=$1', [
      req.params.id,
    ]);

    if (!rows[0]) return null;
    const mouse = new Mice(rows[0]);

    res.send(mouse);
  });
