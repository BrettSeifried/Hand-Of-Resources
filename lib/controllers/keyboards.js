const { Router } = require('express');
const Keyboard = require('../models/Keyboards');

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
    const keyboard = await Keyboard.findKeyboardById(req.params.id, req.body);
    res.send(keyboard);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const keyboard = await Keyboard.updateKeyboardById(
        req.params.id,
        req.body
      );

      res.send(keyboard);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const keyboard = await Keyboard.deleteKeyboardById(req.params.id);
    res.send(keyboard);
  });
