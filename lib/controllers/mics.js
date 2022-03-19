const { Router } = require('express');
const Mic = require('../models/Mics');

module.exports = Router()
  .post('/', async (req, res) => {
    const mic = await Mic.insert(req.body);
    res.send(mic);
  })

  .get('/', async (req, res) => {
    const mics = await Mic.findAll();
    res.send(mics);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const mic = await Mic.findById(req.params.id);
      res.send(mic);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const mic = await Mic.updateById(req.params.id, req.body);
    res.send(mic);
  })

  .delete('/:id', async (req, res) => {
    const mic = await Mic.deleteById(req.params.id);
    res.send(mic);
  });
