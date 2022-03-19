const { Router } = require('express');
const Car = require('../models/Cars');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.send(car);
  })

  .get('/', async (req, res) => {
    const cars = await Car.findAll();
    res.send(cars);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const car = await Car.findCarById(req.params.id);
      res.send(car);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
