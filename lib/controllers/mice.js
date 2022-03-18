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
  });
