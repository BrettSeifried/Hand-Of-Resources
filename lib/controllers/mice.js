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

  .get('/:id', async (req, res, next) => {
    try {
      const mouse = await Mice.findById(req.params.id);
      res.send(mouse);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
