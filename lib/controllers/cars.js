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
  });
