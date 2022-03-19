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
  })

  .patch('/:id', async (req, res) => {
    const car = await Car.updateCarById(req.params.id, req.body);
    res.send(car);
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const car = await Car.deleteCarById(req.params.id);
      res.send(car);
    } catch (error) {
      next(error);
    }
  });
