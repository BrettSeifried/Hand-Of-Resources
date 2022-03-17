const { Router } = require('express');
const Mic = require('../models/Mics');
const pool = require('../utils/pool');

// async function createMic({ name, input, price }) {
//     const { rows } = await
// };

module.exports = Router().post('/', async (req, res) => {
  const mic = await Mic.insert(req.body);
  res.send(mic);
});
